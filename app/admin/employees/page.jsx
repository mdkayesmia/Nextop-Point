"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    search: "",
    role: "all",
  });

  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    salary: "",
    active_clients: 0,
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  // 📦 FETCH
  async function fetchEmployees() {
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) toast.error("Failed to load employees");

    setEmployees(data || []);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 🧠 VALIDATION
  function validate() {
    if (!form.name.trim()) return "Name is required";
    if (!form.role.trim()) return "Role is required";
    if (form.email && !form.email.includes("@")) return "Invalid email";
    return null;
  }

  // 💾 SAVE / UPDATE
  async function saveEmployee() {
    const err = validate();
    if (err) return toast.error(err);

    setLoading(true);

    const payload = {
      name: form.name,
      role: form.role,
      phone: form.phone,
      email: form.email,
      salary: form.salary || 0,
      active_clients: form.active_clients || 0,
    };

    try {
      if (editId) {
        const { error } = await supabase
          .from("employees")
          .update(payload)
          .eq("id", editId);

        if (error) throw error;

        toast.success("Employee updated");
      } else {
        const { error } = await supabase
          .from("employees")
          .insert([payload]);

        if (error) throw error;

        toast.success("Employee added");
      }

      resetForm();
      fetchEmployees();
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }

    setLoading(false);
  }

  // ✏️ EDIT
  function editEmployee(emp) {
    setForm({
      name: emp.name || "",
      role: emp.role || "",
      phone: emp.phone || "",
      email: emp.email || "",
      salary: emp.salary || "",
      active_clients: emp.active_clients || 0,
    });

    setEditId(emp.id);
    setOpen(true);
  }

  // 🗑 DELETE
  async function deleteEmployee(id) {
    await supabase.from("employees").delete().eq("id", id);
    toast.success("Employee deleted");
    fetchEmployees();
  }

  function resetForm() {
    setForm({
      name: "",
      role: "",
      phone: "",
      email: "",
      salary: "",
      active_clients: 0,
    });

    setEditId(null);
    setOpen(false);
  }

  // 🔍 FILTER ENGINE
  const filteredEmployees = employees.filter((e) => {
    const matchSearch =
      `${e.name} ${e.email} ${e.phone}`
        .toLowerCase()
        .includes(filter.search.toLowerCase());

    const matchRole =
      filter.role === "all" || e.role === filter.role;

    return matchSearch && matchRole;
  });

  // get unique roles
  const roles = [...new Set(employees.map((e) => e.role))];

  return (
    <div className="space-y-5">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-900">
          Employees CRM
        </h1>

        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-900 text-white px-4 py-2 rounded"
        >
          {open ? "Close" : "Add Employee"}
        </button>
      </div>

      {/* FILTER */}
      <div className="bg-white p-4 rounded shadow space-y-3">

        <input
          type="text"
          placeholder="Search name, email, phone..."
          className="border p-2 w-full"
          value={filter.search}
          onChange={(e) =>
            setFilter({ ...filter, search: e.target.value })
          }
        />

        <select
          className="border p-2 w-full"
          value={filter.role}
          onChange={(e) =>
            setFilter({ ...filter, role: e.target.value })
          }
        >
          <option value="all">All Roles</option>
          {roles.map((r, i) => (
            <option key={i} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button
          onClick={() =>
            setFilter({ search: "", role: "all" })
          }
          className="bg-gray-200 px-3 py-1 rounded"
        >
          Reset Filters
        </button>
      </div>

      {/* FORM */}
      {open && (
        <div className="bg-white p-4 rounded shadow space-y-3">

          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />

          <input name="role" value={form.role} onChange={handleChange} placeholder="Role" className="border p-2 w-full" />

          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 w-full" />

          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" />

          <input name="salary" value={form.salary} onChange={handleChange} placeholder="Salary" className="border p-2 w-full" />

          <input name="active_clients" value={form.active_clients} onChange={handleChange} placeholder="Active Clients" className="border p-2 w-full" />

          <button
            onClick={saveEmployee}
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              editId ? "bg-yellow-500" : "bg-green-600"
            }`}
          >
            {loading
              ? "Saving..."
              : editId
              ? "Update Employee"
              : "Save Employee"}
          </button>
        </div>
      )}

      {/* TABLE */}
<div className="bg-white shadow rounded-xl overflow-x-auto">

  <table className="min-w-full text-sm">

    <thead className="bg-blue-900 text-white">
      <tr>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Role</th>
        <th className="p-3 text-left">Phone</th>
        <th className="p-3 text-left">Email</th>
        <th className="p-3 text-right">Salary</th>
        <th className="p-3 text-center">Clients</th>
        <th className="p-3 text-center">Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredEmployees.map((e) => (
        <tr
          key={e.id}
          className="border-b hover:bg-gray-50"
        >
          <td className="p-3 font-medium">
            {e.name}
          </td>

          <td className="p-3">
            {e.role}
          </td>

          <td className="p-3">
            {e.phone}
          </td>

          <td className="p-3">
            {e.email}
          </td>

          <td className="p-3 text-right font-semibold">
            ৳{Number(e.salary || 0).toLocaleString()}
          </td>

          <td className="p-3 text-center">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              {e.active_clients}
            </span>
          </td>

          <td className="p-3">
            <div className="flex justify-center gap-2">

              <button
                onClick={() => editEmployee(e)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteEmployee(e.id)}
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