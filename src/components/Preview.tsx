import { motion } from 'framer-motion';
import type { TokenConfig } from '../App';

interface PreviewProps {
  config: TokenConfig;
}

function Preview({ config }: PreviewProps) {
  const features = [
    { key: 'burnable', label: 'Burn', active: config.burnable },
    { key: 'mintable', label: 'Mint', active: config.mintable },
    { key: 'pausable', label: 'Pause', active: config.pausable },
  ];

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#0085ff]/10 to-[#00d4ff]/10 rounded-3xl blur-2xl opacity-50" />

      <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-6 bg-gradient-to-b from-[#00d4ff] to-transparent" />
          <span className="font-mono text-xs text-white/40 uppercase tracking-widest">Preview</span>
        </div>

        {/* Token Card */}
        <motion.div
          layout
          className="relative bg-[#0a0a0f] border border-white/10 rounded-xl overflow-hidden"
        >
          {/* Header gradient */}
          <div className="h-24 bg-gradient-to-br from-[#0085ff]/30 via-[#0085ff]/10 to-transparent relative">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, #00d4ff 0%, transparent 50%)`,
            }} />

            {/* Token icon */}
            <div className="absolute -bottom-8 left-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0085ff] to-[#00d4ff] rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,133,255,0.3)]">
                <span className="font-display text-2xl font-bold text-[#0a0a0f]">
                  {config.symbol ? config.symbol.charAt(0) : '?'}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-12 pb-6 px-6">
            <h3 className="font-display text-xl font-bold text-white mb-1">
              {config.name || 'Token Name'}
            </h3>
            <p className="font-mono text-sm text-[#0085ff]">
              ${config.symbol || 'SYMBOL'}
            </p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white/[0.03] rounded-lg p-3">
                <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1">Supply</p>
                <p className="font-mono text-sm text-white">
                  {config.supply ? Number(config.supply).toLocaleString() : '0'}
                </p>
              </div>
              <div className="bg-white/[0.03] rounded-lg p-3">
                <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1">Decimals</p>
                <p className="font-mono text-sm text-white">{config.decimals}</p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-4 flex flex-wrap gap-2">
              {features.map((f) => (
                <span
                  key={f.key}
                  className={`
                    font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full
                    transition-all duration-300
                    ${f.active
                      ? 'bg-[#0085ff]/20 text-[#0085ff] border border-[#0085ff]/30'
                      : 'bg-white/5 text-white/20 border border-transparent'
                    }
                  `}
                >
                  {f.label}
                </span>
              ))}
            </div>
          </div>

          {/* Base badge */}
          <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#0052ff] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 12l10 10 10-10L12 2z" />
                </svg>
              </div>
              <span className="font-mono text-xs text-white/40">Base Chain</span>
            </div>
            <span className="font-mono text-[10px] text-white/20">ERC-20</span>
          </div>
        </motion.div>

        {/* Code snippet preview */}
        <div className="mt-6 bg-[#0a0a0f] border border-white/5 rounded-lg p-4 overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
          <pre className="font-mono text-[10px] text-white/40 overflow-x-auto">
            <code>
              <span className="text-[#ff79c6]">contract</span>{' '}
              <span className="text-[#50fa7b]">{config.name?.replace(/\s/g, '') || 'MyToken'}</span>{' '}
              <span className="text-[#ff79c6]">is</span> ERC20{config.burnable && ', ERC20Burnable'}{config.pausable && ', Pausable'} {'{'}
              {'\n'}  <span className="text-[#6272a4]">// Total Supply: {config.supply ? Number(config.supply).toLocaleString() : '0'}</span>
              {'\n'}  <span className="text-[#6272a4]">// Decimals: {config.decimals}</span>
              {'\n'}{'}'}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Preview;
