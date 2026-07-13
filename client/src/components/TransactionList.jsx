function TransactionList({
    transactions,
    deleteTransaction,
    editTransaction,
}) {

    const getCategory = (category) => {
        switch (category) {
            case "food":
                return {
                    icon: "🍔",
                    className: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
                };

            case "transport":
                return {
                    icon: "🚗",
                    className: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
                };

            case "entertainment":
                return {
                    icon: "🎬",
                    className: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
                };

            case "utilities":
                return {
                    icon: "💡",
                    className: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
                };

            case "health":
                return {
                    icon: "❤️",
                    className: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
                };

            default:
                return {
                    icon: "📦",
                    className: "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300",
                };
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mt-8 transition-all duration-300">

            <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    Transaction List
                </h2>

                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-1 rounded-full text-sm font-semibold">
                    {transactions.length} Transactions
                </span>

            </div>

            {transactions.length === 0 ? (

                <div className="text-center py-14">

                    <div className="text-6xl mb-4">
                        📂
                    </div>

                    <h3 className="text-xl font-bold text-gray-700 dark:text-white">
                        No Transactions Found
                    </h3>

                    <p className="text-gray-500 dark:text-gray-300 mt-2">
                        Add your first transaction to get started.
                    </p>

                </div>

            ) : (

                transactions.map((transaction) => {

                    const category = getCategory(transaction.category);

                    return (

                        <div
                            key={transaction._id}
                            className="flex flex-col md:flex-row justify-between md:items-center gap-5 p-5 mb-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >

                            <div>

                                <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                                    {transaction.title}
                                </h3>

                                <div
                                    className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-xs font-semibold ${category.className}`}
                                >

                                    <span>{category.icon}</span>

                                    {transaction.category}

                                </div>

                                <p className="text-gray-400 dark:text-gray-300 text-sm mt-3">

                                    {new Date(transaction.date).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}

                                </p>

                            </div>

                            <div className="flex flex-wrap items-center gap-3">

                                <span
                                    className={`text-lg md:text-xl font-bold ${transaction.amount >= 0
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                        }`}
                                >

                                    {transaction.amount >= 0 ? "+" : "-"}₹
                                    {Math.abs(transaction.amount).toLocaleString()}

                                </span>

                                <button
                                    onClick={() => editTransaction(transaction)}
                                    className=" w-full sm:w-auto bg-slate-700 text-white hover:bg-slate-700 hover:scale-105 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-300"
                                >
                                    ✏️ Edit
                                </button>

                                <button
                                    onClick={() => deleteTransaction(transaction._id)}
                                    className="w-full sm:w-auto bg-slate-700 text-white hover:bg-slate-700 hover:scale-105 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-300"
                                >
                                    🗑 Delete
                                </button>

                            </div>

                        </div>

                    );

                })

            )}

        </div>
    );
}

export default TransactionList;