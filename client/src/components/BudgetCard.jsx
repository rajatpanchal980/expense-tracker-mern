import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function BudgetCard({ token, expenses }) {
    const [budget, setBudget] = useState("");
    const [savedBudget, setSavedBudget] = useState(0);

    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const expenseTotal = expenses
        .filter((item) => item.amount < 0)
        .reduce((sum, item) => sum + Math.abs(Number(item.amount)), 0);

    useEffect(() => {
        fetchBudget();
    }, []);

    const fetchBudget = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/budget?month=${month}&year=${year}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data) {
                setSavedBudget(res.data.amount);
                setBudget(res.data.amount);
            }
        } catch (err) { }
    };

    const saveBudget = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/budget`,
                {
                    amount: Number(budget),
                    month,
                    year,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSavedBudget(res.data.amount);
            toast.success("Budget Saved");
        } catch (err) {
            console.log("Budget error:", err.response?.data);
            console.log("err");

            toast.error(err.response?.data?.message || "failed");
        }
    };

    const percent =
        savedBudget > 0
            ? Math.min((expenseTotal / savedBudget) * 100, 100)
            : 0;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mt-8">
            <h2 className="text-2xl font-bold mb-5">
                🎯 Monthly Budget
            </h2>

            <div className="flex gap-3">
                <input
                    type="number"
                    placeholder="Enter Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="border rounded-xl px-4 py-2 flex-1 text-black"
                />

                <button
                    onClick={saveBudget}
                    className="bg-blue-600 text-white px-6 rounded-xl"
                >
                    Save
                </button>
            </div>

            <div className="mt-5">
                <p>Budget : ₹{savedBudget}</p>
                <p>Spent : ₹{expenseTotal}</p>
                <p>Remaining : ₹{savedBudget - expenseTotal}</p>

                <div className="w-full bg-gray-300 rounded-full h-4 mt-4">
                    <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${percent}%` }}
                    ></div>
                </div>

                <p className="mt-2">{percent.toFixed(0)}% Used</p>

                {percent >= 80 && (
                    <p className="text-red-500 font-bold mt-2">
                        ⚠️ Budget Almost Finished!
                    </p>
                )}
            </div>
        </div>
    );
}

export default BudgetCard;