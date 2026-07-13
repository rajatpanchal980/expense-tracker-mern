import toast from "react-hot-toast";
import axios from "axios";
import { useState, useEffect } from "react";

function AddTransaction({
    transactions,
    editId,
    isEditing,
    setIsEditing,
    setEditId,
    fetchExpenses,
}) {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("");

    useEffect(() => {
        if (isEditing && editId) {
            const transaction = transactions.find((t) => t._id === editId);

            if (transaction) {
                setTitle(transaction.title);
                setAmount(Math.abs(transaction.amount));
                setType(transaction.amount >= 0 ? "income" : "expense");
                setCategory(transaction.category || "other");
            }
        }
    }, [isEditing, editId, transactions]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !amount || !category) {
            toast.error("Please fill all fields");
            return;
        }

        const expenseData = {
            title,
            amount:
                type === "income"
                    ? parseFloat(amount)
                    : -parseFloat(amount),
            category,
            date: new Date(),
        };

        try {
            if (isEditing) {
                await axios.put(
                    `http://localhost:3000/api/expenses/${editId}`,
                    expenseData,
                    config
                );

                toast.success("Transaction Updated");

                setIsEditing(false);
                setEditId(null);
            } else {
                await axios.post(
                    "http://localhost:3000/api/expenses",
                    expenseData,
                    config
                );

                toast.success("Transaction Added");
            }

            fetchExpenses();

            setTitle("");
            setAmount("");
            setType("income");
            setCategory("");

        } catch (error) {
            console.error(error);

            if (error.response?.status === 401) {
                toast.error("Session Expired");

                localStorage.removeItem("token");

                window.location.href = "/login";
            } else {
                toast.error("Something went wrong");
            }
        }
    };
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-5 md:p-6 mt-8 transition-all duration-300">

            <h2 className="text-xl font-bold mb-5 text-slate-800 dark:text-white">
                {isEditing ? "Update Transaction" : "Add New Transaction"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    placeholder="Enter title"
                    className="w-full border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400 rounded-xl px-4 py-3 text-sm md:text-base"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <select
                    className="w-full border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl px-4 py-3 text-sm md:text-base"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <select
                    className="w-full border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl px-4 py-3 text-sm md:text-base"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="utilities">Utilities</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                </select>

                <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400 rounded-xl px-4 py-3 text-sm md:text-base"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                    {isEditing ? "Update Transaction" : "Add Transaction"}
                </button>

            </form>

        </div>
    );

}

export default AddTransaction;