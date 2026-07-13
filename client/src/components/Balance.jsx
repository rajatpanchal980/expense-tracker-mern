function Balance({ transactions }) {

    const balance = transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl
         shadow-xl p-6 transition-all duration-300">

            <h3 className="text-gray-500 dark:text-gray-300 text-lg">
                Your Balance
            </h3>

            <h1 className="text-5xl font-bold text-slate-800 dark:text-white mt-2">
                ₹{balance}
            </h1>

        </div>
    );
}

export default Balance;