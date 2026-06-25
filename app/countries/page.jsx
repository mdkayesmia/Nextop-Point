"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FaGlobeAsia, FaUsers, FaArrowLeft, FaCheck, FaCircleNotch, FaExclamation } from "react-icons/fa";

export default function CountriesPage() {
  const [clients, setClients] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  }

  const countries = clients.reduce((acc, client) => {
    const country = client.country || "Unknown";
    if (!acc[country]) acc[country] = [];
    acc[country].push(client);
    return acc;
  }, {});

  const totalCountries = Object.keys(countries).length;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <FaCircleNotch className="animate-spin text-zinc-400 text-2xl" />
        <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase">Syncing ecosystem...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 antialiased text-zinc-800 selection:bg-zinc-100 selection:text-zinc-900">
      {!selectedCountry ? (
        <>
          {/* ================= COUNTRY LIST VIEW ================= */}
          {/* High-End Minimalist Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-10 mb-12">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase block">
                Global Network Overview
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Operational <span className="font-bold">Regions</span>
              </h1>
            </div>
            
            {/* Minimal Stat Aggregators */}
            <div className="flex gap-8 sm:gap-12">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold tracking-wider text-zinc-600 uppercase block">Total Countries</span>
                <span className="text-3xl font-bold p-7 text-zinc-900">{totalCountries}</span>
              </div>
              <div className="w-px h-10 bg-zinc-200 self-end mb-1"></div>
              <div className="space-y-1">
                <span className="text-[10px] font-semibold tracking-wider text-zinc-600 uppercase block">Active Clients</span>
                <span className="text-3xl font-bold pl-7 text-zinc-900">{clients.length}</span>
              </div>
            </div>
          </div>

          {/* Countries Grid - Pure clean structural columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(countries).map(([country, countryClients]) => {
              const approved = countryClients.filter((c) => c.status === "done").length;
              const processing = countryClients.filter((c) => c.status === "processing").length;
              const pending = countryClients.filter((c) => c.status === "pending").length;

              return (
                <div
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className="group bg-white shadow-lg border border-zinc-200/70 rounded-xl p-6 cursor-pointer hover:border-zinc-900 hover:shadow-xl hover:shadow-zinc-100/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div >
                    {/* Top Meta info row */}
                    <div className="flex justify-between items-start mb-6 ">
                      <div className="space-y-0.5">
                        <h2 className="text-lg font-medium text-zinc-900 tracking-tight group-hover:text-zinc-600 transition-colors">
                          {country}
                        </h2>
                        <span className="text-[10px] font-medium tracking-wider text-zinc-400 uppercase block">
                          Destination Account
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
                        <FaGlobeAsia className="text-sm" />
                      </div>
                    </div>

                    {/* Compact Client Pill */}
                    <div className="inline-flex items-center gap-1.5 bg-zinc-50 border border-zinc-100 px-2.5 py-1 rounded-md text-xs font-medium text-zinc-600 mb-8">
                      <FaUsers className="text-zinc-400 text-[11px]" />
                      <span>{countryClients.length} {countryClients.length === 1 ? 'client' : 'clients'}</span>
                    </div>
                  </div>

                  {/* Clean Numerical Metric Stack */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t  border-zinc-100 text-center">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-bold tracking-wider text-zinc-400 uppercase block">Approved</span>
                      <span className="text-sm font-semibold text-emerald-600 bg-emerald-50/40 px-1.5 py-0.5 rounded-md inline-block min-w-[24px]">
                        {approved}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-bold tracking-wider text-zinc-400 uppercase block">Progress</span>
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50/40 px-1.5 py-0.5 rounded-md inline-block min-w-[24px]">
                        {processing}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-bold tracking-wider text-zinc-400 uppercase block">Pending</span>
                      <span className="text-sm font-semibold text-amber-600 bg-amber-50/40 px-1.5 py-0.5 rounded-md inline-block min-w-[24px]">
                        {pending}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {/* ================= COUNTRY DETAILS VIEW ================= */}
          <div className="flex  flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-100 pb-8 mb-12">
            <button
              onClick={() => setSelectedCountry(null)}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-zinc-500 hover:text-zinc-900 bg-white border border-zinc-200 px-4 py-2.5 rounded-lg hover:border-zinc-400 transition-all w-max group"
            >
              <FaArrowLeft className="transform group-hover:-translate-x-0.5 transition-transform text-[10px]" />
              Back to Regions
            </button>

            <div className="sm:text-right space-y-1">
              <h2 className="text-2xl sm:text-3xl font-light text-zinc-900 tracking-tight">
                Country Registry: <span className="font-semibold">{selectedCountry}</span>
              </h2>
              <p className="text-zinc-400 text-xs font-medium">
                Reviewing {countries[selectedCountry]?.length || 0} secure applicant profile records
              </p>
            </div>
          </div>

          {/* CLIENT LIST CARDS - Sleek Premium Data Containers */}
          <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries[selectedCountry]?.map((client) => (
              <div
                key={client.id}
                className="bg-white border shadow-md border-zinc-200/80 rounded-xl p-6 hover:shadow-xl hover:shadow-zinc-100/60 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* User Identity Segment */}
                <div className="mb-6 border-b border-zinc-50 pb-4">
                  <h3 className="text-base font-semibold text-zinc-900 tracking-tight line-clamp-1">
                    {client.name}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-0.5 truncate font-normal">
                    {client.email}
                  </p>
                </div>

                {/* Meta Attributes Table Mock */}
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-medium">Visa Designation</span>
                    <span className="font-semibold text-zinc-700 bg-zinc-50 border border-zinc-100 px-2.5 py-0.5 rounded-md text-[10px] tracking-wide uppercase">
                      {client.visa_type || "—"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-medium">Passport Identifier</span>
                    <span className="font-mono font-medium text-zinc-600 tracking-tight bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded-md text-[11px]">
                      {client.passport_no || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-medium">Application Flow</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                        client.status === "done"
                          ? "bg-emerald-50/50 text-emerald-700 border-emerald-100"
                          : client.status === "pending"
                          ? "bg-amber-50/50 text-amber-700 border-amber-100"
                          : "bg-blue-50/50 text-blue-700 border-blue-100"
                      }`}
                    >
                      {client.status === "done" && <FaCheck className="text-[9px]" />}
                      {client.status === "processing" && <FaCircleNotch className="text-[9px] animate-spin" />}
                      {client.status === "pending" && <FaExclamation className="text-[9px]" />}
                      {client.status}
                    </span>
                  </div>

                  {/* Datetime Stamp Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-zinc-100 text-[10px] text-zinc-400 font-medium tracking-wide">
                    <span>Enrolled On</span>
                    <span className="text-zinc-500 font-normal">
                      {new Date(client.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}