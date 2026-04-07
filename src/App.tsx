import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Globe, Sparkles, Sun, Wind, Cloud } from 'lucide-react';

// Decorative Star Component for the "Before" state
const Star = ({ delay }: { delay: number; key?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.8, 0], 
      scale: [0, 1, 0],
      y: [0, -20, 0]
    }}
    transition={{ 
      duration: 3 + Math.random() * 2, 
      repeat: Infinity, 
      delay 
    }}
    className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }}
  />
);

// Decorative Leaf Component for the "After" state
const FloatingLeaf = ({ delay }: { delay: number; key?: string | number }) => (
  <motion.div
    initial={{ opacity: 0, y: 100, rotate: 0 }}
    animate={{ 
      opacity: [0, 0.8, 0], 
      y: -300, 
      x: Math.sin(delay) * 100,
      rotate: 360 
    }}
    transition={{ 
      duration: 8 + Math.random() * 7, 
      repeat: Infinity, 
      delay,
      ease: "linear"
    }}
    className="absolute text-emerald-400/20 pointer-events-none"
    style={{
      bottom: '-10%',
      left: `${Math.random() * 100}%`,
    }}
  >
    <Leaf size={16 + Math.random() * 16} />
  </motion.div>
);

// New Particle Component for the "After" state
const Particle = ({ delay }: { delay: number; key?: string | number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0], 
      scale: [0, 1, 0],
      x: [0, (Math.random() - 0.5) * 100],
      y: [0, -200]
    }}
    transition={{ 
      duration: 10 + Math.random() * 10, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    className="absolute w-1 h-1 bg-emerald-200 rounded-full blur-[1px] pointer-events-none"
    style={{
      bottom: '10%',
      left: `${Math.random() * 100}%`,
    }}
  />
);

// New Light Flare Component
const LightFlare = ({ delay }: { delay: number; key?: string | number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ 
      opacity: [0, 0.15, 0], 
      scale: [0.5, 1.5, 0.5],
      rotate: [0, 45, 0]
    }}
    transition={{ 
      duration: 15 + Math.random() * 10, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    className="absolute w-64 h-64 bg-yellow-200/20 rounded-full blur-[80px] pointer-events-none"
    style={{
      top: `${Math.random() * 40}%`,
      left: `${Math.random() * 100}%`,
    }}
  />
);

export default function App() {
  const [isInaugurated, setIsInaugurated] = useState(false);
  const [stars, setStars] = useState<number[]>([]);

  useEffect(() => {
    setStars(Array.from({ length: 50 }, (_, i) => i));
  }, []);

  const handleInauguration = () => {
    setIsInaugurated(true);
  };

  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: isInaugurated ? '#042f2e' : '#05050a',
        backgroundImage: isInaugurated 
          ? 'radial-gradient(circle at 50% 50%, #065f46 0%, #042f2e 100%)' 
          : 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #05050a 100%)'
      }}
      transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
      className="h-screen w-full flex flex-col items-center justify-between py-12 px-6 md:px-12 overflow-hidden relative font-sans selection:bg-emerald-500/30"
    >
      {/* Background Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-10" />

      {/* Decorative Frame */}
      <div className={`fixed inset-4 border transition-colors duration-2000 pointer-events-none z-50 ${isInaugurated ? 'border-emerald-500/20' : 'border-white/5'}`} />
      <div className={`fixed inset-6 border transition-colors duration-2000 pointer-events-none z-50 ${isInaugurated ? 'border-emerald-500/10' : 'border-white/5'}`} />

      {/* Background Effects */}
      <AnimatePresence>
        {!isInaugurated && (
          <motion.div 
            key="stars"
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            {stars.map((i) => (
              <Star key={i} delay={i * 0.1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInaugurated && (
          <motion.div 
            key="nature"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            {/* Sunlight Effect */}
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 0.2, y: 0 }}
              transition={{ duration: 3 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[100%] bg-gradient-to-b from-yellow-200/10 via-transparent to-transparent blur-[120px] rotate-12"
            />
            
            {/* Professional Background Pattern (Topography) */}
            <motion.div 
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{ 
                duration: 120, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/topography.png')] mix-blend-overlay" 
            />

            {/* Light Flares */}
            {Array.from({ length: 3 }).map((_, i) => (
              <LightFlare key={`flare-${i}`} delay={i * 5} />
            ))}

            {/* Floating Particles */}
            {Array.from({ length: 30 }).map((_, i) => (
              <Particle key={`particle-${i}`} delay={i * 0.3} />
            ))}

            {/* Floating Leaves */}
            {Array.from({ length: 12 }).map((_, i) => (
              <FloatingLeaf key={`leaf-${i}`} delay={i * 0.8} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-20 text-center w-full max-w-2xl mt-4"
      >
        <motion.div
          animate={isInaugurated ? { y: 0 } : { y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <h2 className={`text-[10px] md:text-xs tracking-[0.6em] uppercase mb-2 transition-colors duration-1000 font-bold ${isInaugurated ? 'text-emerald-300' : 'text-blue-400/60'}`}>
            {isInaugurated ? 'The Dawn of a New Era' : 'Awaiting the Proclamation'}
          </h2>
          <h1 className={`text-3xl md:text-5xl lg:text-6xl font-serif font-bold transition-colors duration-1000 leading-tight ${isInaugurated ? 'text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'text-gray-200'}`}>
            {isInaugurated ? 'Earth Day' : 'The Great'}
            <br />
            {isInaugurated ? 'Inauguration' : 'Inauguration'}
          </h1>
        </motion.div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '40px' }}
          transition={{ delay: 1, duration: 1 }}
          className={`h-px mx-auto mt-4 transition-colors duration-1000 ${isInaugurated ? 'bg-emerald-400' : 'bg-blue-500/30'}`}
        />
      </motion.div>

      {/* Center Section: Scroll Button */}
      <div className="z-20 relative flex flex-col items-center justify-center flex-1 w-full my-4">
        <motion.div
          className="relative"
        >
          <motion.button
            onClick={handleInauguration}
            whileHover={!isInaugurated ? { scale: 1.02 } : {}}
            whileTap={!isInaugurated ? { scale: 0.98 } : {}}
            className="relative cursor-pointer focus:outline-none group"
            disabled={isInaugurated}
          >
            <div className="relative flex items-center justify-center py-2">
              {/* Ribbon (Before state) */}
              <AnimatePresence>
                {!isInaugurated && (
                  <motion.div
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-30"
                  >
                    <div className="w-0.5 h-16 bg-red-700/80 mx-auto relative">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-800 rounded-full shadow-lg border-2 border-red-900 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full border border-red-400/30" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Left Roll (Metallic Sheen) */}
              <div className="absolute left-0 h-[115%] w-4 bg-gradient-to-r from-[#4a3728] via-[#d4af37] via-[#fcf6ba] via-[#d4af37] to-[#4a3728] rounded-full shadow-[inset_-1px_0_3px_rgba(255,255,255,0.3),5px_0_15px_rgba(0,0,0,0.4)] z-20 border-x border-[#3d2b1f]/40" />
              
              {/* Main Scroll Body (Parchment Texture) */}
              <motion.div 
                className={`bg-[#f4e4bc] py-6 mx-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.6)] border-y-[3px] border-[#8b7355] relative overflow-hidden min-w-[240px] md:min-w-[360px] transition-all duration-1000 ${isInaugurated ? 'px-10' : 'px-8'}`}
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(0,0,0,0.1) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.1) 100%),
                    url('https://www.transparenttextures.com/patterns/natural-paper.png'),
                    url('https://www.transparenttextures.com/patterns/parchment.png')
                  `,
                  backgroundBlendMode: 'multiply, normal, multiply',
                  backgroundSize: '100% 100%, 200px 200px, 400px 400px'
                }}
              >
                {/* Subtle Inner Glow/Shadow for Curvature */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5 pointer-events-none" />
                
                {/* Burnt Edge Effect */}
                <div className="absolute inset-0 border-[10px] border-transparent border-y-[#8b7355]/10 pointer-events-none" />
                
                <motion.div
                  animate={{
                    textShadow: isInaugurated 
                      ? ["0 0 4px rgba(16, 185, 129, 0)", "0 0 20px rgba(16, 185, 129, 0.4)", "0 0 4px rgba(16, 185, 129, 0)"]
                      : "none",
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="font-serif text-2xl md:text-4xl font-bold text-[#3d2b1f] flex flex-col items-center justify-center gap-3"
                >
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: isInaugurated ? 1.1 : 1
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1 }
                    }}
                    className="relative"
                  >
                    <Globe className={`w-8 h-8 md:w-12 md:h-12 transition-colors duration-1000 ${isInaugurated ? 'text-emerald-700' : 'text-[#8b7355]'}`} />
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {isInaugurated ? (
                      <motion.div
                        key="revealed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-emerald-900 tracking-tight">Earth Day</span>
                        <span className="text-[9px] uppercase tracking-[0.4em] mt-1 text-[#8b7355]">Commenced</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center"
                      >
                        <div className="h-0.5 w-12 bg-[#8b7355]/30 rounded-full mb-1" />
                        <div className="h-0.5 w-8 bg-[#8b7355]/20 rounded-full" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                {!isInaugurated && (
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-4 text-[#8b7355] text-[8px] uppercase tracking-[0.5em] font-bold"
                  >
                    Break the Seal
                  </motion.div>
                )}
              </motion.div>

              {/* Right Roll (Metallic Sheen) */}
              <div className="absolute right-0 h-[115%] w-4 bg-gradient-to-r from-[#4a3728] via-[#d4af37] via-[#fcf6ba] via-[#d4af37] to-[#4a3728] rounded-full shadow-[inset_1px_0_3px_rgba(255,255,255,0.3),-5px_0_15px_rgba(0,0,0,0.4)] z-20 border-x border-[#3d2b1f]/40" />
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom Section: Grid or Footer */}
      <div className="z-20 w-full max-w-4xl flex flex-col items-center mt-auto">
        <AnimatePresence>
          {isInaugurated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 1 }}
              className="grid grid-cols-3 gap-4 md:gap-8 w-full mb-8"
            >
              {[
                { icon: Sun, label: 'Renew', desc: 'Light' },
                { icon: Wind, label: 'Breathe', desc: 'Air' },
                { icon: Cloud, label: 'Nurture', desc: 'Life' }
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + idx * 0.1 }}
                  className="p-4 md:p-6 rounded-xl bg-emerald-900/40 border border-emerald-400/10 backdrop-blur-xl text-center group"
                >
                  <div className="mb-2 inline-flex p-2 md:p-3 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                    <item.icon size={20} className="md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-white font-serif text-sm md:text-base mb-1">{item.label}</h3>
                  <p className="text-emerald-300/40 text-[10px] md:text-xs hidden sm:block">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          animate={isInaugurated ? { opacity: 1 } : { opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex flex-col items-center gap-2 pb-4"
        >
          <p className={`text-[9px] uppercase tracking-[0.3em] transition-colors duration-1000 font-medium italic ${isInaugurated ? 'text-emerald-400/80' : 'text-blue-400/40'}`}>
            "The earth has music for those who listen."
          </p>
          <div className={`h-px w-10 transition-colors duration-1000 ${isInaugurated ? 'bg-emerald-500/30' : 'bg-white/10'}`} />
        </motion.div>
      </div>
    </motion.div>
  );
}
