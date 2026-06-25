"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);

    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setMessages(data || []);
    setLoading(false);
  }

  async function deleteMessage(id) {
    const result = await Swal.fire({
      title: "Delete Message?",
      html: `
        <div style="font-size:15px">
          This message will be permanently deleted.
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "🗑 Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
      backdrop: true,
      allowOutsideClick: false,
      borderRadius: "16px",
    });

    if (!result.isConfirmed) return;

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    Swal.fire({
      title: "Deleted!",
      text: "Message deleted successfully.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchMessages();

    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-blue-900">
          Contact Messages
        </h1>

        <p className="text-gray-500">
          Manage all website contact requests
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-x-auto">

        <table className="min-w-full text-sm">

          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : messages.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center"
                >
                  No messages found
                </td>
              </tr>
            ) : (
              messages.map((msg) => (
                <tr
                  key={msg.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">
                    {msg.name}
                  </td>

                  <td className="p-3">
                    {msg.email}
                  </td>

                  <td className="p-3">
                    {new Date(
                      msg.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          setSelectedMessage(msg)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          deleteMessage(msg.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* VIEW MESSAGE MODAL */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">

            <div className="bg-blue-900 text-white p-5">
              <h2 className="text-2xl font-bold">
                Message Details
              </h2>
            </div>

            <div className="p-6 space-y-5">

              <div>
                <p className="font-semibold text-gray-700">
                  Name
                </p>

                <p className="text-gray-600">
                  {selectedMessage.name}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">
                  Email
                </p>

                <p className="text-gray-600">
                  {selectedMessage.email}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">
                  Message
                </p>

                <div className="bg-gray-100 p-4 rounded-xl mt-2 whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-700">
                  Date
                </p>

                <p className="text-gray-600">
                  {new Date(
                    selectedMessage.created_at
                  ).toLocaleString()}
                </p>
              </div>

            </div>

            <div className="border-t p-5 flex justify-end">

              <button
                onClick={() =>
                  setSelectedMessage(null)
                }
                className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-lg"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}