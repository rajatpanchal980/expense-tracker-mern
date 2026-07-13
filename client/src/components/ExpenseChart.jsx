import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function ExpenseChart({ transactions }) {

    const income = transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = Math.abs(
        transactions
            .filter((t) => t.amount < 0)
            .reduce((sum, t) => sum + t.amount, 0)
    );

    const balance = income - expense;

    const data = [
        {
            name: "Income",
            value: income,
        },
        {
            name: "Expense",
            value: expense,
        },
    ];

    const COLORS = ["#22c55e", "#ef4444"];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mt-8 transition-all duration-300">

            <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">
                Financial Overview
            </h2>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">

                <div className="w-full max-w-xs mx-auto lg:mx-0 flex justify-center items-start pt-2 flex-shrink-0">

                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="value"
                                innerRadius={50}
                                outerRadius={72}
                                paddingAngle={4}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />

                        </PieChart>
                    </ResponsiveContainer>

                </div>

                <div className="w-full lg:w-3/5 space-y-4">

                    <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-700">

                        <span className="font-medium text-green-700 dark:text-green-400">
                            🟢 Income
                        </span>

                        <span className="text-xl font-bold text-green-600 dark:text-green-400">
                            ₹{income.toLocaleString()}
                        </span>

                    </div>

                    <div className="flex justify-between items-center bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-700">

                        <span className="font-medium text-red-700 dark:text-red-400">
                            🔴 Expense
                        </span>

                        <span className="text-xl font-bold text-red-600 dark:text-red-400">
                            ₹{expense.toLocaleString()}
                        </span>

                    </div>

                    <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700">

                        <span className="font-medium text-blue-700 dark:text-blue-400">
                            💰 Balance
                        </span>

                        <span className="text-xl font-bold text-blue-700 dark:text-blue-400">
                            ₹{balance.toLocaleString()}
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ExpenseChart;