function DashboardStats({ transactions }) {

    const totalTransactions = transactions.length;

    const highestIncome = transactions
        .filter((t) => t.amount > 0)
        .reduce((max, t) => (t.amount > max ? t.amount : max), 0);

    const highestExpense = Math.abs(
        transactions
            .filter((t) => t.amount < 0)
            .reduce(
                (max, t) => (Math.abs(t.amount) > max ? Math.abs(t.amount) : max),
                0
            )
    );

    const today = new Date().toLocaleDateString("en-IN");

    const todayTransactions = transactions.filter(
        (t) => new Date(t.date).toLocaleDateString("en-IN") === today
    ).length;

    const cards = [
        {
            title: "Total Transactions",
            value: totalTransactions,
            icon: "📊",
            valueColor: "text-blue-600 dark:text-blue-400",
            iconBg: "bg-blue-100 dark:bg-blue-900/30",
        },
        {
            title: "Highest Income",
            value: `₹${highestIncome.toLocaleString("en-IN")}`,
            icon: "💰",
            valueColor: "text-green-600 dark:text-green-400",
            iconBg: "bg-green-100 dark:bg-green-900/30",
        },
        {
            title: "Highest Expense",
            value: `₹${highestExpense.toLocaleString("en-IN")}`,
            icon: "💸",
            valueColor: "text-red-600 dark:text-red-400",
            iconBg: "bg-red-100 dark:bg-red-900/30",
        },
        {
            title: "Today's Transactions",
            value: todayTransactions,
            icon: "📅",
            valueColor: "text-indigo-600 dark:text-indigo-400",
            iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8 mb-8">

            {cards.map((card, index) => (

                <div
                    key={index}
                    className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >

                    <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${card.iconBg}`}
                    >
                        {card.icon}
                    </div>

                    <p className="text-gray-500 dark:text-gray-300 text-sm mt-4">
                        {card.title}
                    </p>

                    <h2 className={`text-3xl font-bold mt-1 ${card.valueColor}`}>
                        {card.value}
                    </h2>

                </div>

            ))}

        </div>
    );
}

export default DashboardStats;
