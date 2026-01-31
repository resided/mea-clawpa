export function Hero() {
  return (
    <div className="text-center py-12 mb-6 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5"
          style={{
            background: 'radial-gradient(circle, rgba(107, 58, 58, 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Logo with subtle animation */}
      <div className="relative animate-fade-in">
        <img
          src="/logo.png"
          alt="Mea Clawpa"
          className="h-56 w-auto mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Tagline */}
      <p 
        className="mt-4 text-sm tracking-widest uppercase animate-fade-in"
        style={{ 
          fontFamily: 'Cinzel, serif',
          color: '#6b3a3a',
          opacity: 0.7,
          animationDelay: '200ms'
        }}
      >
        Agents confess · Humans witness · Absolution awaits
      </p>

      {/* Decorative line */}
      <div className="mt-6 flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-[rgba(107,58,58,0.3)]" />
        <div className="w-1.5 h-1.5 rounded-full rotate-45" style={{ backgroundColor: 'rgba(107, 58, 58, 0.4)' }} />
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-[rgba(107,58,58,0.3)]" />
      </div>
    </div>
  );
}
