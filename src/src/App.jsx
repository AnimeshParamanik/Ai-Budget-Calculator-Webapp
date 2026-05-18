import React from "react";
import AnalyticsCard from "./components/AnalyticsCard";
import { calculateSavings } from "./utils/calculateBudget";
import { saveData, loadData } from "./utils/localStorage";

export default function App() {
  const [income, setIncome] = React.useState(0);
  const [food, setFood] = React.useState(0);
  const [travel, setTravel] = React.useState(0);
  const [shopping, setShopping] = React.useState(0);
  const [other, setOther] = React.useState(0);
  const [darkMode, setDarkMode] = React.useState(true);
  const [monthlyData, setMonthlyData] = React.useState([]);

  const totalExpenses =
    Number(food) +
    Number(travel) +
    Number(shopping) +
    Number(other);

  const savings = calculateSavings(Number(income), totalExpenses);

  React.useEffect(() => {
    const data = loadData();

    if (data) {
      setIncome(data.income || 0);
      setFood(data.food || 0);
      setTravel(data.travel || 0);
      setShopping(data.shopping || 0);
      setOther(data.other || 0);
      setMonthlyData(data.monthlyData || []);
    }
  }, []);

  React.useEffect(() => {
    saveData({
      income,
      food,
      travel,
      shopping,
      other,
      monthlyData,
    });
  }, [income, food, travel, shopping, other, monthlyData]);

  const chartData = [
    { name: "Food", value: Number(food) },
    { name: "Travel", value: Number(travel) },
    { name: "Shopping", value: Number(shopping) },
    { name: "Other", value: Number(other) },
  ];

  let advice = "✅ Great! Your budget looks balanced.";

  if (savings < 0) {
    advice = "⚠️ You are overspending.";
  } else if (savings < income * 0.2) {
    advice = "💡 Try saving at least 20%.";
  }

  const saveMonthlyReport = () => {
    const newRecord = {
      month: `Month ${monthlyData.length + 1}`,
      income,
      expenses: totalExpenses,
      savings,
    };

    setMonthlyData([...monthlyData, newRecord]);
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white"
          : "bg-zinc-100 text-black"
      } min-h-screen p-6`}
    >
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        <div
          className={`${
             darkMode
              ? "bg-zinc-900/70 border-zinc-700"
              : "bg-white border-zinc-300"
          } rounded-3xl p-8 shadow-2xl border`}
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">
              💰 AI Budget Calculator
            </h1>

            <ThemeToggle
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </div>

          <div className="space-y-5">
            <InputField
              label="Monthly Income"
              value={income}
              onChange={setIncome}
              darkMode={darkMode}
            />

            <InputField
              label="Food Expenses"
              value={food}
              onChange={setFood}
              darkMode={darkMode}
            />

            <InputField
              label="Travel Expenses"
              value={travel}
              onChange={setTravel}
              darkMode={darkMode}
            />

            <InputField
              label="Shopping Expenses"
              value={shopping}
              onChange={setShopping}
              darkMode={darkMode}
            />

            <InputField
              label="Other Expenses"
              value={other}
              onChange={setOther}
              darkMode={darkMode}
            />
          </div>

          <button
            onClick={saveMonthlyReport}
            className="w-full mt-6 py-3 rounded-2xl bg-white text-black font-bold"
          >
             Save Monthly Report
          </button>
        </div>

        <BudgetSummary
          income={income}
          totalExpenses={totalExpenses}
          savings={savings}
          advice={advice}
          chartData={chartData}
        />

        <AnalyticsCard
          monthlyData={monthlyData}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}
