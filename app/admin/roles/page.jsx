"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function RolesPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();

    const channel = supabase
      .channel("roles-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "nextopadmin",
        },
        fetchUsers
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase
      .from("nextopadmin")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setUsers(data || []);
    }

    setLoading(false);
  }

  async function makeAdmin(id) {
    const { error } = await supabase
      .from("nextopadmin")
      .update({ role: "admin" })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("User promoted to Admin");
    fetchUsers();
  }

  async function makeUser(id) {
    const { error } = await supabase
      .from("nextopadmin")
      .update({ role: "user" })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Admin changed to User");
    fetchUsers();
  }

  async function deleteUser(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("nextopadmin")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("User deleted");
    fetchUsers();
  }

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-blue-900">
          Role Management
        </h1>

        <p className="text-gray-500">
          Manage Admin & User Permissions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Admins</p>
          <h2 className="text-3xl font-bold text-green-600">
            {
              users.filter(
                (u) => u.role === "admin"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Users</p>
          <h2 className="text-3xl font-bold text-orange-500">
            {
              users.filter(
                (u) => u.role !== "admin"
              ).length
            }
          </h2>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Role</th>
              <th className="p-3 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3 font-medium">
                  {user.name}
                </td>

                <td className="p-3">
                  {user.email}
                </td>

                <td className="p-3">
                  {user.phone}
                </td>

                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      user.role === "admin"
                        ? "bg-green-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">

                    {user.role === "admin" ? (
                      <button
                        onClick={() =>
                          makeUser(user.id)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Make User
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          makeAdmin(user.id)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Make Admin
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteUser(user.id)
                      }
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