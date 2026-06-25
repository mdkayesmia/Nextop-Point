"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchData();

    // 🔥 realtime updates
    const channel = supabase
      .channel("appointments-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "appointments" },
        fetchData
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchData() {
    const { data } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });

    setAppointments(data || []);
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Update failed");
      return;
    }

    toast.success(`Marked as ${status}`);
    fetchData();
  }

  // 🔍 FILTER LOGIC
  const filteredData =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-900">
          Appointments
        </h1>

        {/* FILTER */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

  <table className="min-w-full text-sm">

    <thead className="bg-blue-900 text-white">
      <tr>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Service</th>
        <th className="p-3 text-left">Date</th>
        <th className="p-3 text-left">Phone</th>
        <th className="p-3 text-center">Status</th>
        <th className="p-3 text-center">Action</th>
      </tr>
    </thead>

    <tbody>
      {filteredData.map((a) => (
        <tr
          key={a.id}
          className="border-b hover:bg-gray-50"
        >
          <td className="p-3 font-medium">
            {a.name}
          </td>

          <td className="p-3">
            {a.service}
          </td>

          <td className="p-3">
            {a.date}
          </td>

          <td className="p-3">
            {a.phone}
          </td>

          <td className="p-3 text-center">
            <span
              className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                a.status === "done"
                  ? "bg-green-600"
                  : "bg-yellow-500"
              }`}
            >
              {a.status}
            </span>
          </td>

          <td className="p-3">
            <div className="flex justify-center">
              {a.status !== "done" ? (
                <button
                  onClick={() =>
                    updateStatus(a.id, "done")
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Mark Done
                </button>
              ) : (
                <button
                  onClick={() =>
                    updateStatus(a.id, "pending")
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Mark Pending
                </button>
              )}
            </div>
          </td>

        </tr>
      ))}
    </tbody>

  </table>

</div>
    </div>
  );
}