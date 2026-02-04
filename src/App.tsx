import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TokenForm from './components/TokenForm';
import Preview from './components/Preview';
import DeployedModal from './components/DeployedModal';

export interface TokenConfig {
  name: string;
  symbol: string;
  supply: string;
  decimals: number;
  burnable: boolean;
  mintable: boolean;
  pausable: boolean;
}

const defaultConfig: TokenConfig = {
  name: '',
  symbol: '',
  supply: '1000000',
  decimals: 18,
  burnable: false,
  mintable: false,
  pausable: false,
};

function App() {
  const [config, setConfig] = useState<TokenConfig>(defaultConfig);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showDeployed, setShowDeployed] = useState(false);
  const [deployedAddress, setDeployedAddress] = useState('');

  const handleDeploy = async () => {
    if (!config.name || !config.symbol || !config.supply) return;

    setIsDeploying(true);
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 3000));
    const fakeAddress = '0x' + Array.from({ length: 40 }, () =>
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
    setDeployedAddress(fakeAddress);
    setIsDeploying(false);
    setShowDeployed(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Animated grid background */}
      <div className="fixed inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 133, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 133, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div className="fixed top-1/4 -left-32 w-64 h-64 bg-[#0085ff] rounded-full blur-[128px] opacity-30" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-[#00d4ff] rounded-full blur-[150px] opacity-20" />

      {/* Noise overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-6 px-6 md:px-12"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 bg-[#0085ff] rounded-lg rotate-45 opacity-80" />
                <div className="absolute inset-1 bg-[#0a0a0f] rounded-md rotate-45" />
                <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-[#0085ff]">B</span>
              </div>
              <span className="font-display text-xl tracking-tight">BASE FORGE</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#0085ff]/60">
              <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
              MAINNET
            </div>
          </div>
        </motion.header>

        {/* Main content */}
        <main className="flex-1 px-6 md:px-12 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12 md:mb-16"
            >
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tight mb-4">
                <span className="text-white/90">DEPLOY</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0085ff] to-[#00d4ff]">
                  YOUR TOKEN
                </span>
              </h1>
              <p className="font-mono text-sm text-white/40 max-w-md">
                Launch your ERC-20 token on Base chain in seconds.
                No coding required. Gas-optimized contracts.
              </p>
            </motion.div>

            {/* Form and Preview Grid */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <TokenForm
                  config={config}
                  setConfig={setConfig}
                  onDeploy={handleDeploy}
                  isDeploying={isDeploying}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Preview config={config} />
              </motion.div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex justify-center">
            <p className="font-mono text-[10px] text-white/25 tracking-wider">
              Requested by @sat_org · Built by @clonkbot
            </p>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {showDeployed && (
          <DeployedModal
            address={deployedAddress}
            tokenName={config.name}
            onClose={() => setShowDeployed(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
