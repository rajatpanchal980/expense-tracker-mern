function IncomeExpense({ transactions }) {

    const income = transactions
        .filter((transaction) => transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expense = transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 text-center transition-all duration-300">
                <h3 className="text-white-50 text-lg font-semibold">
                    Income
                </h3>

                <p className="text-white-60 text-3xl font-bold mt-2">
                    ₹{income}
                </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 text-center transition-all duration-300">
                <h3 className="text-white-500 text-lg font-semibold">
                    Expense
                </h3>

                <p className="text-white-600 text-3xl font-bold mt-2">
                    ₹{Math.abs(expense)}
                </p>
            </div>

        </div>
    );
}

export default IncomeExpense;