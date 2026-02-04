import { motion } from 'framer-motion';
import type { TokenConfig } from '../App';

interface TokenFormProps {
  config: TokenConfig;
  setConfig: React.Dispatch<React.SetStateAction<TokenConfig>>;
  onDeploy: () => void;
  isDeploying: boolean;
}

function TokenForm({ config, setConfig, onDeploy, isDeploying }: TokenFormProps) {
  const updateConfig = (key: keyof TokenConfig, value: string | number | boolean) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const isValid = config.name && config.symbol && config.supply;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-1 h-6 bg-gradient-to-b from-[#0085ff] to-transparent" />
        <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Token Configuration</span>
      </div>

      {/* Token Name */}
      <div className="group">
        <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2">
          Token Name
        </label>
        <input
          type="text"
          value={config.name}
          onChange={(e) => updateConfig('name', e.target.value)}
          placeholder="My Awesome Token"
          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#0085ff]/50 focus:bg-white/[0.05] transition-all duration-300"
        />
      </div>

      {/* Symbol and Decimals Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2">
            Symbol
          </label>
          <input
            type="text"
            value={config.symbol}
            onChange={(e) => updateConfig('symbol', e.target.value.toUpperCase().slice(0, 8))}
            placeholder="MTK"
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#0085ff]/50 focus:bg-white/[0.05] transition-all duration-300 uppercase"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2">
            Decimals
          </label>
          <select
            value={config.decimals}
            onChange={(e) => updateConfig('decimals', parseInt(e.target.value))}
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-[#0085ff]/50 focus:bg-white/[0.05] transition-all duration-300 appearance-none cursor-pointer"
          >
            <option value={18}>18 (standard)</option>
            <option value={8}>8</option>
            <option value={6}>6 (USDC-like)</option>
            <option value={0}>0</option>
          </select>
        </div>
      </div>

      {/* Total Supply */}
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2">
          Total Supply
        </label>
        <input
          type="text"
          value={config.supply}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, '');
            updateConfig('supply', value);
          }}
          placeholder="1000000"
          className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#0085ff]/50 focus:bg-white/[0.05] transition-all duration-300"
        />
        <p className="font-mono text-[10px] text-white/20 mt-1.5">
          {config.supply ? Number(config.supply).toLocaleString() : '0'} tokens
        </p>
      </div>

      {/* Features */}
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">
          Features
        </label>
        <div className="space-y-3">
          <FeatureToggle
            label="Burnable"
            description="Tokens can be destroyed"
            checked={config.burnable}
            onChange={(v) => updateConfig('burnable', v)}
          />
          <FeatureToggle
            label="Mintable"
            description="New tokens can be created"
            checked={config.mintable}
            onChange={(v) => updateConfig('mintable', v)}
          />
          <FeatureToggle
            label="Pausable"
            description="Transfers can be paused"
            checked={config.pausable}
            onChange={(v) => updateConfig('pausable', v)}
          />
        </div>
      </div>

      {/* Deploy Button */}
      <motion.button
        onClick={onDeploy}
        disabled={!isValid || isDeploying}
        whileHover={isValid && !isDeploying ? { scale: 1.02 } : {}}
        whileTap={isValid && !isDeploying ? { scale: 0.98 } : {}}
        className={`
          w-full relative overflow-hidden rounded-lg py-4 font-mono text-sm uppercase tracking-widest
          transition-all duration-300
          ${isValid && !isDeploying
            ? 'bg-gradient-to-r from-[#0085ff] to-[#00d4ff] text-[#0a0a0f] font-bold cursor-pointer hover:shadow-[0_0_40px_rgba(0,133,255,0.4)]'
            : 'bg-white/5 text-white/30 cursor-not-allowed'
          }
        `}
      >
        {isDeploying ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Deploying to Base...
          </span>
        ) : (
          'Deploy Token'
        )}

        {isValid && !isDeploying && (
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.button>

      <p className="font-mono text-[10px] text-center text-white/20">
        Gas fees apply. Connect wallet to deploy.
      </p>
    </div>
  );
}

function FeatureToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-lg cursor-pointer hover:border-white/10 hover:bg-white/[0.04] transition-all duration-200 group">
      <div>
        <span className="font-mono text-sm text-white/80 group-hover:text-white transition-colors">{label}</span>
        <p className="font-mono text-[10px] text-white/30">{description}</p>
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
          onChange(!checked);
        }}
        className={`
          relative w-12 h-6 rounded-full transition-all duration-300
          ${checked ? 'bg-[#0085ff]' : 'bg-white/10'}
        `}
      >
        <motion.div
          animate={{ x: checked ? 24 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`
            absolute top-1 w-4 h-4 rounded-full transition-colors
            ${checked ? 'bg-white' : 'bg-white/40'}
          `}
        />
      </div>
    </label>
  );
}

export default TokenForm;
