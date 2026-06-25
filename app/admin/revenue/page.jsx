"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function RevenuePage() {
    const [clients, setClients] = useState([]);
    const [revenues, setRevenues] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        client_id: "",
        amount: "",
        source: "",
        payment_method: "",
        note: "",
    });

    const [filterClient, setFilterClient] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const { data: clientsData } = await supabase
            .from("clients")
            .select("*");

        const { data: revenueData } = await supabase
            .from("revenues")
            .select("*")
            .order("created_at", { ascending: false });

        setClients(clientsData || []);
        setRevenues(revenueData || []);
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function addRevenue() {
        if (!form.client_id)
            return toast.error("Select client");

        if (!form.amount)
            return toast.error("Amount required");

        const { error } = await supabase.from("revenues").insert([
            {
                client_id: form.client_id,
                amount: parseFloat(form.amount),
                source: form.source,
                payment_method: form.payment_method,
                note: form.note,
            },
        ]);

        if (error) {
            console.log(error);
            return toast.error("Failed to add revenue");
        }

        toast.success("Revenue added");

        setForm({
            client_id: "",
            amount: "",
            source: "",
            payment_method: "",
            note: "",
        });

        fetchData();
    }

    async function deleteRevenue(id) {
        const { error } = await supabase
            .from("revenues")
            .delete()
            .eq("id", id);

        if (error) return toast.error(error.message);

        toast.success("Deleted");
        fetchData();
    }

    const filtered = filterClient
        ? revenues.filter((r) => r.client_id === filterClient)
        : revenues;

    const totalRevenue = filtered.reduce(
        (sum, r) => sum + Number(r.amount || 0),
        0
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-900">
                    💰 Revenue Dashboard
                </h1>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                    {showForm ? "Close Form" : "Add Revenue"}
                </button>
            </div>

            {/* FORM */}
            {showForm && (
                <div className="bg-white p-5 rounded-xl shadow space-y-4">

                    <select
                        name="client_id"
                        value={form.client_id}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    >
                        <option value="">Select Client</option>

                        {clients.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name} | {c.phone}
                            </option>
                        ))}
                    </select>

                    <input
                        name="amount"
                        type="number"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="Amount"
                        className="border p-2 w-full rounded"
                    />

                    <input
                        name="source"
                        value={form.source}
                        onChange={handleChange}
                        placeholder="Source (Visa Service, Air Ticket, Embassy Fee)"
                        className="border p-2 w-full rounded"
                    />

                    <input
                        name="payment_method"
                        value={form.payment_method}
                        onChange={handleChange}
                        placeholder="Payment Method"
                        className="border p-2 w-full rounded"
                    />

                    <input
                        name="note"
                        value={form.note}
                        onChange={handleChange}
                        placeholder="Note"
                        className="border p-2 w-full rounded"
                    />

                    <button
                        onClick={addRevenue}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                    >
                        Save Revenue
                    </button>

                </div>
            )}

            {/* FILTER */}
            <div className="bg-white p-4 rounded shadow">
                <select
                    value={filterClient}
                    onChange={(e) => setFilterClient(e.target.value)}
                    className="border p-2 w-full"
                >
                    <option value="">All Clients</option>
                    {clients.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* TOTAL */}
            <div className="bg-green-100 text-green-800 p-4 rounded">
                💰 Total Revenue: {totalRevenue} BDT
            </div>

            {/* TABLE */}
<div className="bg-white shadow rounded-xl overflow-x-auto">

  <table className="min-w-full text-sm">

    <thead className="bg-blue-900 text-white">
      <tr>
        <th className="p-3 text-left">Client</th>
        <th className="p-3 text-left">Amount</th>
        <th className="p-3 text-left">Source</th>
        <th className="p-3 text-left">Method</th>
        <th className="p-3 text-left">Note</th>
        <th className="p-3 text-center">Action</th>
      </tr>
    </thead>

    <tbody>
      {filtered.map((r) => {
        const client = clients.find(
          (c) => c.id === r.client_id
        );

        return (
          <tr
            key={r.id}
            className="border-b hover:bg-gray-50"
          >
            <td className="p-3 font-medium">
              {client?.name || "Unknown"}
            </td>

            <td className="p-3 text-left font-semibold text-green-600">
              ৳{Number(r.amount || 0).toLocaleString()}
            </td>

            <td className="p-3">
              {r.source}
            </td>

            <td className="p-3">
              {r.payment_method}
            </td>

            <td className="p-3 max-w-xs truncate">
              {r.note}
            </td>

            <td className="p-3">
              <div className="flex justify-center">
                <button
                  onClick={() => deleteRevenue(r.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </td>

          </tr>
        );
      })}
    </tbody>

  </table>

</div>

        </div>
    );
}