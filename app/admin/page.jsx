"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        clients: 0,
        appointments: 0,
        employees: 0,
        revenue: 0,
    });
    const [appointmentStats, setAppointmentStats] = useState({
        pending: 0,
        done: 0,
    });

    const [clientGrowth, setClientGrowth] = useState([]);
    const [visaStatus, setVisaStatus] = useState([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);

    useEffect(() => {
        fetchAll();

        const channel = supabase
            .channel("crm-realtime")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "clients" },
                fetchAll
            )
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "appointments" },
                fetchAll
            )
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "employees" },
                fetchAll
            )
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "revenues" },
                fetchAll
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    async function fetchAll() {
        const [
            clients,
            appointments,
            employees,
            revenues,
        ] = await Promise.all([
            supabase.from("clients").select("*"),
            supabase.from("appointments").select("*"),
            supabase.from("employees").select("*"),
            supabase.from("revenues").select("*"),
        ]);

        const clientData = clients.data || [];
        const appointmentData = appointments.data || [];
        const employeeData = employees.data || [];
        const revenueData = revenues.data || [];
        const pendingAppointments = appointmentData.filter(
            (a) => a.status === "pending"
        ).length;

        const doneAppointments = appointmentData.filter(
            (a) => a.status === "done"
        ).length;

        setAppointmentStats({
            pending: pendingAppointments,
            done: doneAppointments,
        });

        // 💰 TOTAL REVENUE
        const totalRevenue = revenueData.reduce(
            (sum, r) => sum + Number(r.amount || 0),
            0
        );

        setStats({
            clients: clientData.length,
            appointments: appointmentData.length,
            employees: employeeData.length,
            revenue: totalRevenue,
        });

        setClientGrowth(groupByMonth(clientData));
        setVisaStatus(groupVisa(clientData));
        setMonthlyRevenue(groupRevenueByMonth(revenueData));
    }

    // 📊 CLIENT GROWTH
    function groupByMonth(data) {
        const map = {};

        data.forEach((item) => {
            const month = new Date(item.created_at).toLocaleString(
                "default",
                { month: "short" }
            );

            map[month] = (map[month] || 0) + 1;
        });

        return Object.keys(map).map((m) => ({
            month: m,
            value: map[m],
        }));
    }

    // 📊 VISA STATUS
    function groupVisa(data) {
        const map = {
            processing: 0,
            approved: 0,
            rejected: 0,
        };

        data.forEach((c) => {
            const status = c.status || "processing";
            map[status] = (map[status] || 0) + 1;
        });

        return Object.keys(map).map((k) => ({
            name: k,
            value: map[k],
        }));
    }

    // 💰 REVENUE BY MONTH
    function groupRevenueByMonth(data) {
        const map = {};

        data.forEach((item) => {
            const month = new Date(item.created_at).toLocaleString(
                "default",
                { month: "short" }
            );

            map[month] =
                (map[month] || 0) + Number(item.amount || 0);
        });

        return Object.keys(map).map((m) => ({
            month: m,
            revenue: map[m],
        }));
    }

    const COLORS = ["#1d4ed8", "#22c55e", "#ef4444"];

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-blue-900">
                    CRM Dashboard
                </h1>
                <p className="text-gray-500">
                    Real-time analytics overview
                </p>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                <Card title="Clients" value={stats.clients} />
                <Card title="Appointments" value={stats.appointments} />
                <Card title="Employees" value={stats.employees} />
                <Card
                    title="Total Revenue"
                    value={`৳ ${stats.revenue.toLocaleString()}`}
                />

            </div>

            {/* APPOINTMENT INSIGHTS */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                <Card
                    title="Pending Appointments"
                    value={appointmentStats.pending}
                />

                <Card
                    title="Done Appointments"
                    value={appointmentStats.done}
                />

                <Card
                    title="Pending Clients"
                    value={
                        visaStatus.find(
                            (v) => v.name === "pending"
                        )?.value || 0
                    }
                />

                <Card
                    title="Processing Clients"
                    value={
                        visaStatus.find(
                            (v) => v.name === "processing"
                        )?.value || 0
                    }
                />

                <Card
                    title="Approved Clients"
                    value={
                        visaStatus.find(
                            (v) => v.name === "done"
                        )?.value || 0
                    }
                />
            </div>

            {/* CHARTS */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* CLIENT GROWTH */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <h2 className="font-bold mb-4">
                        Client Growth
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={clientGrowth}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#1d4ed8"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* VISA STATUS */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <h2 className="font-bold mb-4">
                        Visa Status
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={visaStatus}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >
                                {visaStatus.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* REVENUE CHART */}
                <div className="bg-white p-5 rounded-xl shadow md:col-span-2">
                    <h2 className="font-bold mb-4">
                        Monthly Revenue
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyRevenue}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#16a34a"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

            </div>

            {/* INSIGHTS */}
            <div className="bg-white p-5 rounded-xl shadow">
                <h2 className="font-bold mb-3">
                    Quick Insights
                </h2>

                <ul className="text-gray-600 space-y-2">
                    <li>✔ Revenue growing monthly</li>
                    <li>✔ Client base expanding</li>
                    <li>✔ Visa processing improving</li>
                </ul>
            </div>

        </div>
    );
}

/* CARD */
function Card({ title, value }) {
    return (
        <div className="bg-white shadow rounded-xl p-5 hover:shadow-lg transition">
            <p className="text-gray-500">{title}</p>
            <h2 className="text-2xl font-bold text-blue-900">
                {value}
            </h2>
        </div>
    );
}