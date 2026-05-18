export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 rounded-xl bg-white text-black font-medium"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
