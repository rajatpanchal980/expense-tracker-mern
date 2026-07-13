import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            toast.success("Login Successful!");
            navigate("/");
            window.location.reload();
        } catch (err) {
            toast.error(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Welcome Back 👋
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Login to your Expense Tracker
                </p>

                <form onSubmit={handleLogin} className="space-y-5">

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-600 font-semibold"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;