import ExpenseChart from "./ExpenseChart";

export default function BudgetSummary({
  income,
  totalExpenses,
  savings,
  advice,
  chartData,
}) {
  return (
    <div className="bg-white text-black rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold mb-6">
          📊 Budget Summary
        </h2>

        <div className="space-y-4 text-lg">
          <div className="flex justify-between border-b pb-2">
            <span>Total Income</span>
            <span>₹ {income}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Total Expenses</span>
            <span>₹ {totalExpenses}</span>
          </div>

          <div className="flex justify-between border-b pb-2 font-bold text-xl">
            <span>Savings</span>
            <span>₹ {savings}</span>
          </div>
        </div>

        <ExpenseChart chartData={chartData} />
      </div>

      <div className="mt-8 bg-zinc-100 rounded-2xl p-5">
        <h3 className="text-xl font-semibold mb-2">
          🤖 AI Suggestion
        </h3>

        <p className="text-zinc-700">{advice}</p>
      </div>
    </div>
  );
}
