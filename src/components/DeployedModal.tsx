import { motion } from 'framer-motion';
import { useState } from 'react';

interface DeployedModalProps {
  address: string;
  tokenName: string;
  onClose: () => void;
}

function DeployedModal({ address, tokenName, onClose }: DeployedModalProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const basescanUrl = `https://basescan.org/token/${address}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#0085ff]/20 to-[#00ff88]/20 rounded-3xl blur-2xl" />

        <div className="relative bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden">
          {/* Success header */}
          <div className="relative h-32 bg-gradient-to-br from-[#00ff88]/20 via-[#0085ff]/10 to-transparent flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-16 h-16 bg-[#00ff88] rounded-full flex items-center justify-center"
            >
              <svg className="w-8 h-8 text-[#0a0a0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>

            {/* Confetti particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, -60 - Math.random() * 40],
                  x: [(Math.random() - 0.5) * 100],
                  scale: [0, 1, 0.5],
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 1, delay: 0.3 + i * 0.05 }}
                className="absolute"
                style={{
                  width: 8 + Math.random() * 4,
                  height: 8 + Math.random() * 4,
                  background: ['#0085ff', '#00ff88', '#00d4ff', '#ff79c6'][i % 4],
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="font-display text-2xl font-bold text-white text-center mb-2">
              Token Deployed!
            </h2>
            <p className="font-mono text-sm text-white/40 text-center mb-6">
              {tokenName} is now live on Base
            </p>

            {/* Address */}
            <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4 mb-4">
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-2">
                Contract Address
              </p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-xs text-white flex-1 truncate">
                  {address}
                </p>
                <button
                  onClick={copyAddress}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {copied ? (
                    <svg className="w-4 h-4 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <a
                href={basescanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#0085ff] to-[#00d4ff] text-[#0a0a0f] font-mono text-sm font-bold uppercase tracking-wider py-3 rounded-lg hover:shadow-[0_0_30px_rgba(0,133,255,0.4)] transition-all duration-300"
              >
                View on BaseScan
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <button
                onClick={onClose}
                className="w-full font-mono text-sm text-white/40 hover:text-white py-3 transition-colors"
              >
                Deploy Another Token
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DeployedModal;
