export default function Hero() {
  return (
    <section
      id="hero"
      className="h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-r from-[#0f2d1d] via-[#1e3b28] to-[#24452f]"
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#c8dece66] bg-white/5 backdrop-blur-md text-[#c8dece] text-xs tracking-[0.25em] uppercase mb-8">
          Pure Ayurveda · Organic Wellness · Est. 2024
        </div>

        <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight">
          Ancient Wisdom,
          <br />
          <span className="text-[#d4b07a] italic">
            Modern Vitality
          </span>
        </h1>

        <p className="text-[#e5e5e5] mt-8 text-lg leading-8 max-w-2xl mx-auto">
          Crafted from nature's finest herbs, our Ayurvedic
          formulations restore balance, boost energy, and
          nurture your body from within.
        </p>

        <div className="flex gap-5 justify-center mt-10 flex-wrap">
          <button className="px-8 py-4 rounded-full bg-[#3d6b4f] hover:bg-[#4d7f60] transition text-white">
            Shop Collection
          </button>

          <button className="px-8 py-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition">
            Our Story
          </button>
        </div>
      </div>
    </section>
  );
}