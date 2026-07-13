import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function MonthlyChart({ transactions }) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const monthlyData = months.map((month, index) => {
        const expense = Math.abs(
            transactions
                .filter((t) => {
                    const d = new Date(t.date);
                    return (
                        t.amount < 0 &&
                        d.getMonth() === index &&
                        d.getFullYear() === new Date().getFullYear()
                    );
                })
                .reduce((sum, t) => sum + t.amount, 0)
        );

        return {
            month,
            expense,
        };
    });

    return (
        <div className="mt-8 rounded-3xl p-[2px] bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 shadow-2xl">

            <div className="rounded-3xl bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-7 transition-all duration-300">

                <div className="flex items-center justify-between mb-6">

                    <div>

                        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                            📈 Monthly Expenses
                        </h2>

                        <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                            Expense trend of current year
                        </p>

                    </div>

                </div>

                <div className="rounded-2xl bg-white/70 dark:bg-slate-700/60 backdrop-blur-md p-4 shadow-inner">

                    <ResponsiveContainer width="100%" height={320}>

                        <BarChart
                            data={monthlyData}
                            margin={{
                                top: 10,
                                right: 20,
                                left: -20,
                                bottom: 5,
                            }}
                        >

                            <defs>

                                <linearGradient
                                    id="expenseGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop offset="0%" stopColor="#3B82F6" />
                                    <stop offset="100%" stopColor="#1D4ED8" />
                                </linearGradient>

                            </defs>

                            <CartesianGrid
                                strokeDasharray="4 4"
                                stroke="#475569"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fill: "#CBD5E1",
                                    fontSize: 13,
                                }}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fill: "#CBD5E1",
                                    fontSize: 13,
                                }}
                            />

                            <Tooltip
                                cursor={{
                                    fill: "#1E293B",
                                }}
                                formatter={(value) => [`₹${value}`, "Expense"]}
                                contentStyle={{
                                    borderRadius: "14px",
                                    border: "none",
                                    background: "#1E293B",
                                    color: "#fff",
                                    boxShadow: "0 10px 30px rgba(0,0,0,.25)",
                                }}
                            />

                            <Bar
                                dataKey="expense"
                                fill="url(#expenseGradient)"
                                radius={[12, 12, 0, 0]}
                                barSize={36}
                                animationDuration={1200}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
}

export default MonthlyChart;