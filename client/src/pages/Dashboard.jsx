import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Header from "../components/Header";
import Balance from "../components/Balance";
import IncomeExpense from "../components/IncomeExpense";
import ExpenseChart from "../components/ExpenseChart";
import MonthlyChart from "../components/MonthlyChart";
import DashboardStats from "../components/DashboardStats";
import ExportButtons from "../components/ExportButtons";
import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";

function Dashboard() {

    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const [transactions, setTransactions] = useState([]);
    const [editId, setEditId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const [filter, setFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                "http://localhost:3000/api/expenses",
                config
            );

            setTransactions(response.data);

        } catch (error) {

            console.error(error);

            if (error.response?.status === 401) {
                toast.error("Session Expired");

                localStorage.removeItem("token");

                window.location.href = "/login";
            } else {
                toast.error("Failed to load expenses");
            }

        } finally {
            setLoading(false);
        }
    };

    const deleteTransaction = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `http://localhost:3000/api/expenses/${id}`,
                config
            );

            toast.success("Transaction Deleted");

            fetchExpenses();

        } catch (error) {

            console.error(error);

            toast.error("Delete Failed");
        }
    };

    const editTransaction = (transaction) => {
        setEditId(transaction._id);
        setIsEditing(true);
    };

    const filteredTransactions = transactions.filter((transaction) => {

        const matchesSearch = transaction.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =
            filter === "all" ||
            (filter === "income" && transaction.amount >= 0) ||
            (filter === "expense" && transaction.amount < 0);

        const matchesCategory =
            categoryFilter === "all" ||
            transaction.category === categoryFilter;

        return (
            matchesSearch &&
            matchesFilter &&
            matchesCategory
        );
    });
    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-300 via-blue-50 to-indigo-100 
dark:from-slate-600 dark:via-slate-500 dark:to-slate-700 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 text-slate-800 dark:text-white">

                <Header />

                <Balance transactions={transactions} />

                <IncomeExpense transactions={transactions} />

                <ExpenseChart transactions={transactions} />

                <MonthlyChart transactions={transactions} />

                <DashboardStats transactions={transactions} />

                <ExportButtons transactions={transactions} />

                {/* Search & Filters */}

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mt-8 transition-all duration-300">

                    <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">
                        Search & Filters
                    </h2>

                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="w-full border border-gray-300 dark:border-slate-600
                        dark:bg-slate-700 dark:text-white rounded-xl p-3 shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                        <select
                            className="border border-gray-300  dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl p-3"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>

                        <select
                            className="border border-gray-300  dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-xl p-3"
                            value={categoryFilter}
                            onChange={(e) =>
                                setCategoryFilter(e.target.value)
                            }
                        >
                            <option value="all">All Categories</option>
                            <option value="food">Food</option>
                            <option value="transport">Transport</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="utilities">Utilities</option>
                            <option value="health">Health</option>
                            <option value="other">Other</option>
                        </select>

                    </div>

                </div>

                <AddTransaction
                    transactions={transactions}
                    setTransactions={setTransactions}
                    editId={editId}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    setEditId={setEditId}
                    fetchExpenses={fetchExpenses}
                />

                {loading ? (

                    <div className="text-center py-10">

                        <p className="text-blue-600 font-semibold text-lg">
                            Loading Transactions...
                        </p>

                    </div>

                ) : (

                    <TransactionList
                        transactions={filteredTransactions}
                        deleteTransaction={deleteTransaction}
                        editTransaction={editTransaction}
                    />

                )}

            </div>

        </div>
    );
}

export default Dashboard;
