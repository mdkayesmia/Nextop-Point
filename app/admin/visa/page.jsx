"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function VisaPage() {
  const [visa, setVisa] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase.from("visa_process").select("*");
    setVisa(data || []);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Visa Process</h1>

      <div className="bg-white shadow rounded-xl">
        <table className="w-full">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3">Client</th>
              <th>Country</th>
              <th>Stage</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {visa.map((v) => (
              <tr key={v.id} className="border-b">
                <td className="p-3">{v.client_id}</td>
                <td>{v.country}</td>
                <td>{v.visa_stage}</td>
                <td>{v.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}