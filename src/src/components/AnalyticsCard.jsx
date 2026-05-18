export default function AnalyticsCard({ monthlyData, darkMode }) {
  return (
    <div
      className={`${
        darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
      } rounded-3xl p-8 shadow-2xl`}
    >
      <h2 className="text-3xl font-bold mb-6">
        📅 Monthly Analytics
      </h2>

      <div className="space-y-4">
        {monthlyData.length === 0 ? (
          <p>No monthly reports saved yet.</p>
        ) : (
          monthlyData.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl border border-zinc-700"
            >
              <h3 className="font-bold text-lg">{item.month}</h3>

              <p>Income: ₹ {item.income}</p>
              <p>Expenses: ₹ {item.expenses}</p>
              <p>Savings: ₹ {item.savings}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
