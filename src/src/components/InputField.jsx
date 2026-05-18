export default function InputField({
  label,
  value,
  onChange,
  darkMode,
}) {
  return (
    <div>
      <label
        className={`block text-sm mb-2 ${
          darkMode ? "text-zinc-300" : "text-zinc-700"
        }`}
      >
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter amount"
        className={`${
          darkMode
            ? "bg-zinc-800 border-zinc-700 text-white"
            : "bg-zinc-100 border-zinc-300 text-black"
        } w-full px-4 py-3 rounded-2xl border focus:outline-none`}
      />
    </div>
  );
}
