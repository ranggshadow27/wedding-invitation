// components/wedding/WeddingFooter.tsx
export default function WeddingFooter() {
  return (
    <footer className="bg-gray-900 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Family Perempuan */}
          <div className="md:text-left">
            <p className="text-rose-400 text-sm tracking-widest mb-3">
              THE BIG FAMILY OF
            </p>
            <p className="text-3xl font-semibold">Aisyah Putri</p>
          </div>

          {/* Logo Tengah */}
          <div className="flex justify-center items-center">
            <div className="text-6xl font-['Allura'] text-rose-400">❤️</div>
          </div>

          {/* Family Laki-laki */}
          <div className="md:text-right">
            <p className="text-rose-400 text-sm tracking-widest mb-3">
              THE BIG FAMILY OF
            </p>
            <p className="text-3xl font-semibold">Ahmad Rafi</p>
          </div>
        </div>

        <div className="text-center mt-16 pt-12 border-t border-gray-800 text-sm text-gray-400">
          Made with love • {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
