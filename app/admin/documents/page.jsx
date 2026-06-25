"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function DocumentsPage() {
    const [clients, setClients] = useState([]);
    const [documents, setDocuments] = useState([]);

    const [files, setFiles] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [showForm, setShowForm] = useState(false);

    const [phoneFilter, setPhoneFilter] = useState("");

    const [form, setForm] = useState({
        doc_name: "",
    });

    // 🔄 FETCH DATA (FORCE CLEAN DATA)
    async function fetchData() {
        const { data: clientsData } = await supabase
            .from("clients")
            .select("*");

        const { data: docsData, error } = await supabase
            .from("documents")
            .select("*");

        if (error) {
            console.log("FETCH ERROR:", error);
            return;
        }

        console.log("DOCUMENTS LOADED:", docsData);

        setClients(clientsData || []);
        setDocuments(docsData || []);
    }

    useEffect(() => {
        fetchData();
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // 📤 UPLOAD FILES
    async function uploadFilesAndSave() {
        if (!selectedClient)
            return toast.error("Select a client");

        if (!form.doc_name)
            return toast.error("Document name required");

        if (files.length === 0)
            return toast.error("Select at least one file");

        try {
            for (const file of files) {
                const fileName = `${Date.now()}-${file.name}`;

                const { error: uploadError } = await supabase.storage
                    .from("documents")
                    .upload(fileName, file);

                if (uploadError) {
                    console.log(uploadError);
                    throw uploadError;
                }

                const { data } = supabase.storage
                    .from("documents")
                    .getPublicUrl(fileName);

                const fileUrl = data.publicUrl;

                const { error } = await supabase.from("documents").insert([
                    {
                        client_id: selectedClient,
                        doc_name: form.doc_name,
                        file_url: fileUrl,
                        status: "uploaded",
                    },
                ]);

                if (error) throw error;
            }

            toast.success("Documents uploaded");

            setFiles([]);
            setForm({ doc_name: "" });
            setSelectedClient("");

            fetchData();
        } catch (err) {
            console.log(err);
            toast.error("Upload failed");
        }
    }

    // 🗑 DELETE 
    async function deleteDoc(id) {
        console.log("DELETE ID:", id);

        if (!id) {
            return toast.error("Invalid ID");
        }

        const { data, error } = await supabase
            .from("documents")
            .delete()
            .eq("id", id)
            .select();

        console.log("DELETE RESPONSE:", { data, error });

        if (error) {
            return toast.error(error.message);
        }

        if (!data || data.length === 0) {
            return toast.error("No record found (ID mismatch)");
        }

        toast.success("Deleted successfully");
        fetchData();
    }

    // 🔍 FILTER BY PHONE
    const filteredDocuments = documents.filter((doc) => {
        const client = clients.find((c) => c.id === doc.client_id);

        if (!phoneFilter) return true;

        return client?.phone
            ?.toLowerCase()
            .includes(phoneFilter.toLowerCase());
    });

    return (
        <div className="space-y-6">

            <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-blue-900">
                📄 Documents System (Production Safe)
            </h1>
            <div className="flex justify-between items-center">

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                >
                    {showForm ? "Close Form" : "Upload Document"}
                </button>
            </div>
            </div>

            {/* FILTER */}
            <div className="bg-white p-4 rounded shadow">
                <input
                    value={phoneFilter}
                    onChange={(e) => setPhoneFilter(e.target.value)}
                    placeholder="Filter by phone..."
                    className="border p-2 w-full"
                />
            </div>

            {/* UPLOAD */}
            {/* HEADER + BUTTON */}


            {/* UPLOAD FORM */}
            {showForm && (
                <div className="bg-white p-5 rounded-xl shadow space-y-4">

                    <select
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
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
                        name="doc_name"
                        value={form.doc_name}
                        onChange={handleChange}
                        placeholder="Document Name"
                        className="border p-2 w-full rounded"
                    />

                    <input
                        type="file"
                        multiple
                        onChange={(e) => setFiles([...e.target.files])}
                        className="border p-2 w-full rounded"
                    />

                    {files.length > 0 && (
                        <div className="bg-gray-50 p-3 rounded">
                            <p className="font-medium mb-2">
                                Selected Files ({files.length})
                            </p>

                            {files.map((file, index) => (
                                <div key={index} className="text-sm text-gray-600">
                                    • {file.name}
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={uploadFilesAndSave}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                    >
                        Upload Documents
                    </button>

                </div>
            )}

            {/* TABLE */}
            <div className="bg-white shadow rounded-xl overflow-x-auto">
                <table className="min-w-full text-sm">

                    <thead className="bg-blue-900 text-white">
                        <tr>
                            <th className="p-3 text-left">Client</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Document</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-center">File</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredDocuments.map((doc) => {
                            const client = clients.find(
                                (c) => c.id === doc.client_id
                            );

                            return (
                                <tr
                                    key={doc.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="p-3 font-medium">
                                        {client?.name || "Unknown"}
                                    </td>

                                    <td className="p-3">
                                        {client?.phone || "-"}
                                    </td>

                                    <td className="p-3">
                                        {doc.doc_name}
                                    </td>

                                    <td className="p-3 text-center">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            {doc.status}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center">
                                        <a
                                            href={doc.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 underline"
                                        >
                                            View File
                                        </a>
                                    </td>

                                    <td className="p-3">
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => deleteDoc(doc.id)}
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