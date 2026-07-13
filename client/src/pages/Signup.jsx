import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post
                (`${import.meta.env.VITE_API_URL}/api/auth/signup`, form);



            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            toast.success("Signup Successful!");

            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-2">
                    Create Account 🚀
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Sign up to start tracking your expenses
                </p>

                <form onSubmit={handleSignup} className="space-y-5">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
                    >
                        Create Account
                    </button>

                </form>

                <p className="text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-600 font-semibold"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Signup;