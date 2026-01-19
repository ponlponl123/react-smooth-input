"use client";

function Header() {
  return (
    <header className="py-12 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Smooth Input Playground</h1>
          <div className="text-gray-600">
            A playground to test the react-smooth-input library.
          </div>
        </div>
        <button
          onClick={() => {
            document.body.classList.toggle("dark");
          }}
          className="smooth-transition p-2 bg-gray-900 dark:bg-amber-300 h-max rounded-full border-2 border-white/40 hover:opacity-80"
        >
          <span className="hidden dark:block">☀️</span>
          <span className="dark:hidden">🌙</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
