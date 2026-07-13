import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };


    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 py-6">

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-wide">
                💰 Expense Tracker
            </h1>

            <div className="flex items-center gap-4">

                <div className="text-right">

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Welcome
                    </p>

                    <p className="font-bold text-lg text-slate-900 dark:text-white">
                        👤 {user?.name}
                    </p>

                </div>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-900 text-white transition duration-300"
                >
                    {darkMode ? "☀️" : "🌙"}
                </button>

                <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2 rounded-xl font-semibold shadow-lg transition duration-300 hover:scale-105"
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Header;