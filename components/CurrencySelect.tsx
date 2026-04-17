"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { currencies } from "@/lib/currencies";

interface Props {
  value: string;
  onChange: (code: string) => void;
  placeholder?: string;
}

export function CurrencySelect({ value, onChange, placeholder = "Select currency" }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = currencies.find((c) => c.code === value);

  const filtered = search.trim()
    ? currencies.filter(
        (c) =>
          c.code.toLowerCase().includes(search.toLowerCase()) ||
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.symbol.includes(search)
      )
    : currencies;

  const close = useCallback(() => {
    setOpen(false);
    setSearch("");
  }, []);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, close]);

  // Close on Escape
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (open) document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open, close]);

  // Focus search input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 10);
      // Scroll selected item into view
      const el = listRef.current?.querySelector("[data-selected=true]");
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [open]);

  function select(code: string) {
    onChange(code);
    close();
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 h-10 rounded-md border border-input bg-background px-3 text-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] transition-colors hover:border-gray-300"
      >
        {selected ? (
          <span className="flex items-center gap-2 min-w-0">
            <span className="font-semibold text-gray-800 shrink-0">{selected.code}</span>
            <span className="text-gray-400 truncate">{selected.name}</span>
          </span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <svg
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {/* Search */}
          <div className="px-3 py-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
              </svg>
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by code or name…"
                className="w-full text-sm outline-none text-gray-700 placeholder:text-gray-400 bg-transparent"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-gray-400 hover:text-gray-600 text-xs leading-none"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div ref={listRef} className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-sm text-gray-400 text-center">No currencies found</p>
            ) : (
              filtered.map((c) => {
                const isSelected = c.code === value;
                return (
                  <button
                    key={c.code}
                    type="button"
                    data-selected={isSelected}
                    onClick={() => select(c.code)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors ${
                      isSelected
                        ? "bg-[#F5F3FF] text-[#8B5CF6]"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span className={`w-10 shrink-0 font-semibold ${isSelected ? "text-[#8B5CF6]" : "text-gray-800"}`}>
                      {c.code}
                    </span>
                    <span className={`flex-1 ${isSelected ? "text-[#6D28D9]" : "text-gray-500"}`}>
                      {c.name}
                    </span>
                    <span className="text-xs text-gray-400 shrink-0">{c.symbol}</span>
                    {isSelected && (
                      <svg className="w-4 h-4 text-[#8B5CF6] shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer count */}
          {search && filtered.length > 0 && (
            <div className="px-3 py-1.5 border-t border-gray-100 text-xs text-gray-400">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
