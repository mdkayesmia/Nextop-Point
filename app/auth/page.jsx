"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
    FaEye,
    FaEyeSlash,
    FaUserShield,
    FaEnvelope,
    FaLock,
    FaPhone,
    FaUser,
} from "react-icons/fa";

export default function AdminAuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const [register, setRegister] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!login.email.trim())
            return toast.error("Email is required");

        if (!login.password)
            return toast.error("Password is required");

        const { data, error } = await supabase
            .from("nextopadmin")
            .select("*")
            .eq("email", login.email)
            .eq("password", login.password)
            .single();

        if (error || !data) {
            return toast.error(
                "Invalid email or password"
            );
        }

        localStorage.setItem(
            "nextopUser",
            JSON.stringify(data)
        );



        if (data.role === "admin") {
            toast.success("Login successful");
            router.push("/admin");
        } else {
            toast.success("Wait for Admin Approval");
            setLogin({
                email: "",
                password: "",

            });

        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!register.name)
            return toast.error("Name is required");

        if (!register.email.includes("@"))
            return toast.error("Valid email required");

        if (!register.phone)
            return toast.error("Phone number required");

        if (register.password.length < 6)
            return toast.error(
                "Password must be at least 6 characters"
            );

        if (
            register.password !== register.confirmPassword
        ) {
            return toast.error(
                "Passwords do not match"
            );
        }

        const { data: existingUser } = await supabase
            .from("nextopadmin")
            .select("id")
            .eq("email", register.email)
            .single();

        if (existingUser) {
            return toast.error("Email already exists");
        }

        const { error } = await supabase
            .from("nextopadmin")
            .insert([
                {
                    name: register.name,
                    email: register.email,
                    phone: register.phone,
                    password: register.password,
                    role: "user",
                },
            ]);

        if (error) {
            console.log(error);
            return toast.error(error.message);
        }

        toast.success("Registration successful");

        setRegister({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        });

        setIsLogin(true);
    };

    return (
        <div className="h-[628] relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-700 flex items-center justify-center px-4">

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">

                <div className="absolute w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse" />

                <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse" />

            </div>

            <div className="relative z-10 w-full max-w-6xl">

                <div className="h-[600] grid lg:grid-cols-2 overflow-hidden rounded-[35px] shadow-xl border border-white/10 backdrop-blur-xl bg-white/10">

                    {/* LEFT SIDE */}
                    <div className="hidden lg:flex flex-col justify-center p-12 text-white">

                        <div className="mb-4">

                            <div className="w-20 h-20  rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-xl">

                                <FaUserShield size={42} />

                            </div>

                        </div>

                        <h1 className="text-3xl font-black leading-tight">
                            NEXTOP CRM
                        </h1>

                        <p className="mt-2 text-blue-100 text-lg">
                            Secure Administration Portal
                        </p>

                        <div className="mt-5 space-y-4">

                            <div className="bg-white/10 p-4 rounded-xl">
                                ✓ Client Management
                            </div>

                            <div className="bg-white/10 p-4 rounded-xl">
                                ✓ Revenue Tracking
                            </div>

                            <div className="bg-white/10 p-4 rounded-xl">
                                ✓ Document Management
                            </div>

                            <div className="bg-white/10 p-4 rounded-xl">
                                ✓ Appointment Scheduling
                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="bg-white p-2 md:p-3">

                        {/* SWITCH */}
                        <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">

                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-3 rounded-xl font-semibold transition ${isLogin
                                    ? "bg-blue-900 text-white"
                                    : "text-gray-600"
                                    }`}
                            >
                                Login
                            </button>

                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-3 rounded-xl font-semibold transition ${!isLogin
                                    ? "bg-blue-900 text-white"
                                    : "text-gray-600"
                                    }`}
                            >
                                Register
                            </button>

                        </div>

                        <AnimatePresence mode="wait">

                            {isLogin ? (
                                <motion.form
                                    key="login"
                                    initial={{
                                        opacity: 0,
                                        x: 50,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -50,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                    onSubmit={handleLogin}
                                    className="space-y-5"
                                >

                                    <h2 className="text-3xl font-bold text-blue-900">
                                        Welcome Back
                                    </h2>

                                    <div className="relative">

                                        <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={login.email}
                                            onChange={(e) =>
                                                setLogin({
                                                    ...login,
                                                    email:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full border p-4 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                    </div>

                                    <div className="relative">

                                        <FaLock className="absolute left-4 top-4 text-gray-400" />

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Password"
                                            value={login.password}
                                            onChange={(e) =>
                                                setLogin({
                                                    ...login,
                                                    password:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full border p-4 pl-12 pr-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            className="absolute right-4 top-4"
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )}
                                        </button>

                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-900 to-cyan-500 text-white font-bold hover:scale-105 transition"
                                    >
                                        Login To Admin Panel
                                    </button>

                                </motion.form>
                            ) : (
                                <motion.form
                                    key="register"
                                    initial={{
                                        opacity: 0,
                                        x: 50,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -50,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                    onSubmit={handleRegister}
                                    className="space-y-4"
                                >

                                    <h2 className="text-3xl font-bold text-blue-900">
                                        Create Admin Account
                                    </h2>

                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={register.name}
                                            onChange={(e) =>
                                                setRegister({
                                                    ...register,
                                                    name:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full border p-4 pl-12 rounded-xl"
                                        />
                                    </div>

                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={register.email}
                                            onChange={(e) =>
                                                setRegister({
                                                    ...register,
                                                    email:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full border p-4 pl-12 rounded-xl"
                                        />
                                    </div>

                                    <div className="relative">
                                        <FaPhone className="absolute left-4 top-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Phone"
                                            value={register.phone}
                                            onChange={(e) =>
                                                setRegister({
                                                    ...register,
                                                    phone:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full border p-4 pl-12 rounded-xl"
                                        />
                                    </div>

                                    <div className="relative">

                                        <FaLock className="absolute left-4 top-4 text-gray-400" />

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Password"
                                            value={register.password}
                                            onChange={(e) =>
                                                setRegister({
                                                    ...register,
                                                    password:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full border p-4 pl-12 pr-12 rounded-xl"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            className="absolute right-4 top-4"
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )}
                                        </button>

                                    </div>

                                    <div className="relative">

                                        <FaLock className="absolute left-4 top-4 text-gray-400" />

                                        <input
                                            type={
                                                showConfirm
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Confirm Password"
                                            value={
                                                register.confirmPassword
                                            }
                                            onChange={(e) =>
                                                setRegister({
                                                    ...register,
                                                    confirmPassword:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full border p-4 pl-12 pr-12 rounded-xl"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirm(
                                                    !showConfirm
                                                )
                                            }
                                            className="absolute right-4 top-4"
                                        >
                                            {showConfirm ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )}
                                        </button>

                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-400 text-white font-bold hover:scale-105 transition"
                                    >
                                        Create Account
                                    </button>

                                </motion.form>
                            )}

                        </AnimatePresence>

                    </div>

                </div>

            </div>

        </div>
    );
}