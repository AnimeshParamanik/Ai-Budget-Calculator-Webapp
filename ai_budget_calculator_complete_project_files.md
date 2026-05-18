# AI Budget Calculator — Complete Project Files

## 📁 Folder Structure

```bash
ai-budget-calculator/
│
├── public/
│   └── favicon.png
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   │
│   ├── components/
│   │   ├── InputField.jsx
│   │   ├── BudgetSummary.jsx
│   │   ├── ExpenseChart.jsx
│   │   ├── AnalyticsCard.jsx
│   │   └── ThemeToggle.jsx
│   │
│   ├── utils/
│   │   ├── calculateBudget.js
│   │   └── localStorage.js
│   │
│   └── assets/
│       └── preview.png
│
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── README.md
```

---

# src/main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

# src/index.css

```css
@import "tailwindcss";

body {
  margin: 0;
  font-family: Arial, sans-serif;
}
```

---

# src/utils/calculateBudget.js

```js
export function calculateSavings(income, expenses) {
  return income - expenses;
}
```

---

# src/utils/localStorage.js

```js
export function saveData(data) {
  localStorage.setItem("budget-data", JSON.stringify(data));
}

export function loadData() {
  return JSON.parse(localStorage.getItem("budget-data"));
}
```

---

# src/components/InputField.jsx

```jsx
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
```

---

# src/components/ThemeToggle.jsx

```jsx
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
```

---

# src/components/ExpenseChart.jsx

```jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseChart({ chartData }) {
  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

  return (
    <div className="h-72 mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
```

---

# src/components/BudgetSummary.jsx

```jsx
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
```

---

# src/components/AnalyticsCard.jsx

```jsx
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
```

---

# src/App.jsx

```jsx
import React from "react";
import InputField from "./components/InputField";
import ThemeToggle from "./components/ThemeToggle";
import BudgetSummary from "./components/BudgetSummary";
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
```

---

# package.json

```json
{
  "name": "ai-budget-calculator",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.12.7"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "tailwindcss": "^4.0.0",
    "vite": "^5.0.0"
  }
}
```

---

# vite.config.js

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

