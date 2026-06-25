"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function ClientsPage() {
    const [clients, setClients] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        country: "",
        visa_type: "",
        passport_no: "",
        status: "processing",
    });

    const [filter, setFilter] = useState({
        search: "",
        status: "all",
        country: "all",
    });

    useEffect(() => {
        fetchClients();
    }, []);

    async function fetchClients() {
        const { data, error } = await supabase
            .from("clients")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            toast.error(error.message);
            return;
        }

        setClients(data || []);
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function validate() {
        if (!form.name.trim()) return "Name is required";
        if (!form.phone.trim()) return "Phone is required";

        if (form.email && !form.email.includes("@"))
            return "Invalid email address";

        if (form.password.length < 4)
            return "Password must be at least 4 characters";

        return null;
    }

    async function saveClient() {
        const validationError = validate();

        if (validationError) {
            toast.error(validationError);
            return;
        }

        setLoading(true);

        const payload = {
            name: form.name,
            email: form.email,
            password: form.password,
            phone: form.phone,
            country: form.country,
            visa_type: form.visa_type,
            passport_no: form.passport_no,
            status: form.status,
        };

        try {
            if (editId) {
                const { error } = await supabase
                    .from("clients")
                    .update(payload)
                    .eq("id", editId);

                if (error) throw error;

                toast.success("Client updated successfully");
            } else {
                const { error } = await supabase
                    .from("clients")
                    .insert([payload]);

                if (error) throw error;

                toast.success("Client added successfully");
            }

            resetForm();
            fetchClients();
        } catch (error) {
            
            toast.error(error.message);
        }

        setLoading(false);
    }

    function editClient(client) {
        setForm({
            name: client.name || "",
            email: client.email || "",
            password: client.password || "",
            phone: client.phone || "",
            country: client.country || "",
            visa_type: client.visa_type || "",
            passport_no: client.passport_no || "",
            status: client.status || "processing",
        });

        setEditId(client.id);
        setOpen(true);
    }

    async function deleteClient(id) {
        const confirmDelete = confirm(
            "Are you sure you want to delete this client?"
        );

        if (!confirmDelete) return;

        const { error } = await supabase
            .from("clients")
            .delete()
            .eq("id", id);

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success("Client deleted");
        fetchClients();
    }

    function resetForm() {
        setForm({
            name: "",
            email: "",
            password: "",
            phone: "",
            country: "",
            visa_type: "",
            passport_no: "",
            status: "processing",
        });

        setEditId(null);
        setOpen(false);
    }

    const filteredClients = clients.filter((client) => {
        const searchMatch =
            `${client.name || ""} ${client.email || ""} ${client.phone || ""}`
                .toLowerCase()
                .includes(filter.search.toLowerCase());

        const statusMatch =
            filter.status === "all" ||
            client.status === filter.status;

        const countryMatch =
            filter.country === "all" ||
            client.country === filter.country;

        return searchMatch && statusMatch && countryMatch;
    });

    const countries = [
        ...new Set(
            clients
                .map((c) => c.country)
                .filter(Boolean)
        ),
    ];

    return (
        <div className="space-y-5">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-900">
                    Clients Management
                </h1>

                <button
                    onClick={() => {
                        resetForm();
                        setOpen(!open);
                    }}
                    className="bg-blue-900 text-white px-4 py-2 rounded"
                >
                    {open ? "Close Form" : "Add Client"}
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow space-y-3">

                <input
                    type="text"
                    placeholder="Search name, email, phone..."
                    className="border p-2 w-full rounded"
                    value={filter.search}
                    onChange={(e) =>
                        setFilter({
                            ...filter,
                            search: e.target.value,
                        })
                    }
                />

                <div className="grid md:grid-cols-2 gap-3">

                    <select
                        className="border p-2 rounded"
                        value={filter.status}
                        onChange={(e) =>
                            setFilter({
                                ...filter,
                                status: e.target.value,
                            })
                        }
                    >
                        <option value="all">All Status</option>
                        <option value="processing">Processing</option>
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                    </select>

                    <select
                        className="border p-2 rounded"
                        value={filter.country}
                        onChange={(e) =>
                            setFilter({
                                ...filter,
                                country: e.target.value,
                            })
                        }
                    >
                        <option value="all">All Countries</option>

                        {countries.map((country) => (
                            <option
                                key={country}
                                value={country}
                            >
                                {country}
                            </option>
                        ))}
                    </select>

                </div>
            </div>

            {/* Form */}
            {open && (
                <div className="bg-white p-5 rounded-xl shadow space-y-3">

                    <input
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />

                    <input
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />

                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />

                    <input
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />

                    <input
                        name="country"
                        placeholder="Country"
                        value={form.country}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />

                    <input
                        name="visa_type"
                        placeholder="Visa Type"
                        value={form.visa_type}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />

                    <input
                        name="passport_no"
                        placeholder="Passport Number"
                        value={form.passport_no}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    />

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="border p-2 w-full rounded"
                    >
                        <option value="processing">
                            Processing
                        </option>
                        <option value="pending">
                            Pending
                        </option>
                        <option value="done">
                            Done
                        </option>
                    </select>

                    <button
                        onClick={saveClient}
                        disabled={loading}
                        className={`w-full py-2 rounded text-white ${editId
                                ? "bg-yellow-500"
                                : "bg-green-600"
                            }`}
                    >
                        {loading
                            ? "Saving..."
                            : editId
                                ? "Update Client"
                                : "Save Client"}
                    </button>

                </div>
            )}

           <div className="bg-white shadow rounded-xl overflow-x-auto">
  <table className="min-w-full text-sm">

    <thead className="bg-blue-900 text-white">
      <tr>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Email</th>
        <th className="p-3 text-left">Phone</th>
        <th className="p-3 text-left">Country</th>
        <th className="p-3 text-left">Visa</th>
        <th className="p-3 text-left">Passport</th>
        <th className="p-3 text-left">Password</th>
        <th className="p-3 text-center">Status</th>
        <th className="p-3 text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredClients.map((client) => (
        <tr
          key={client.id}
          className="border-b hover:bg-gray-50"
        >
          <td className="p-3">{client.name}</td>

          <td className="p-3">{client.email}</td>

          <td className="p-3">{client.phone}</td>

          <td className="p-3">{client.country}</td>

          <td className="p-3">{client.visa_type}</td>

          <td className="p-3">{client.passport_no}</td>

          <td className="p-3 font-mono">
            {client.password}
          </td>

          <td className="p-3 text-center">
            <span
              className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                client.status === "done"
                  ? "bg-green-600"
                  : client.status === "pending"
                  ? "bg-yellow-500"
                  : "bg-blue-600"
              }`}
            >
              {client.status}
            </span>
          </td>

          <td className="p-3">
            <div className="flex justify-center gap-2">
              <button
                onClick={() => editClient(client)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteClient(client.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
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