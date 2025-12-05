import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  ChevronDown,
  X,
} from "lucide-react";

const ProjectShowcase = () => {
  // Filter panel behavior
  const [isDesktop, setIsDesktop] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true); // desktop default = ON

  const [batchOpen, setBatchOpen] = useState(true);
  const [stackOpen, setStackOpen] = useState(true);
  const [domainOpen, setDomainOpen] = useState(true);

  const [selectedBatches, setSelectedBatches] = useState(["Batch 1", "Batch 2"]);
  const [selectedStacks, setSelectedStacks] = useState(["React", "PostgreSQL"]);
  const [selectedDomains, setSelectedDomains] = useState(["Healthcare"]);

  // Detect screen size for desktop/mobile logic
  useEffect(() => {
    const update = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const toggleBatch = (b: string) =>
    setSelectedBatches((prev) =>
      prev.includes(b) ? prev.filter((i) => i !== b) : [...prev, b]
    );

  const toggleStack = (s: string) =>
    setSelectedStacks((prev) =>
      prev.includes(s) ? prev.filter((i) => i !== s) : [...prev, s]
    );

  const toggleDomain = (d: string) =>
    setSelectedDomains((prev) =>
      prev.includes(d) ? prev.filter((i) => i !== d) : [...prev, d]
    );

  const projects = [
    { id: 1, image: "/story/samuel.png", title: "Project A", batch: "Batch 2", domain: "Finance", description: "Lorem ipsum." },
    { id: 2, image: "/story/samuel.png", title: "Project A", batch: "Batch 2", domain: "Finance", description: "Lorem ipsum." },
    { id: 3, image: "/story/samuel.png", title: "Project A", batch: "Batch 2", domain: "Finance", description: "Lorem ipsum." }
  ];

  // Reset Handler
  const resetFilters = () => {
    setSelectedBatches([]);
    setSelectedStacks([]);
    setSelectedDomains([]);
  };

  // Apply Handler
  const applyFilters = () => {
    if (!isDesktop) setIsFilterOpen(false); // close drawer on mobile/tablet
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div className="relative h-48 bg-gray-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center px-6 lg:px-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            KADA Project Showcase
          </h1>
        </div>
      </div>

      {/* CAROUSEL INFO SECTION */}
      <div className="py-10 border-b relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-72 h-48 rounded-lg overflow-hidden">
            <img src="/story/dhruv.png" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 lg:px-12 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start gap-3 mb-4">
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded">
                Batch 2
              </span>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded">
                Human Resources
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
              KADA Connect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Empowering talent through the Korea-ASEAN Digital Academy Bootcamp.
            </p>
          </div>
        </div>

        {/* ARROWS */}
        <div className="absolute bottom-4 right-6 flex gap-3">
          <button className="p-2 bg-gray-200 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-200 rounded-full">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* =============================== */}
      {/* MAIN CONTENT AREA               */}
      {/* =============================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex gap-10">

        {/* =============================== */}
        {/* LEFT FILTER PANEL (DESKTOP)    */}
        {/* =============================== */}
        {isDesktop && (
          <div
            className={`transition-all duration-300 ${
              isFilterOpen ? "w-64 opacity-100" : "w-0 opacity-0"
            } overflow-hidden`}
          >
            {/* FILTER CONTENT */}
            <div className="border rounded-lg p-5 bg-white shadow-sm h-full flex flex-col">
              {/* BATCH */}
              <div className="mb-6">
                <button
                  className="flex justify-between w-full"
                  onClick={() => setBatchOpen(!batchOpen)}
                >
                  <span className="font-semibold text-gray-900">Batch</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      batchOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {batchOpen && (
                  <div className="mt-3 space-y-2">
                    {["Batch 1", "Batch 2", "Batch 3"].map((b) => (
                      <label key={b} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedBatches.includes(b)}
                          onChange={() => toggleBatch(b)}
                        />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* STACK */}
              <div className="mb-6">
                <button
                  className="flex justify-between w-full"
                  onClick={() => setStackOpen(!stackOpen)}
                >
                  <span className="font-semibold text-gray-900">Tech Stack</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      stackOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {stackOpen && (
                  <div className="mt-3 space-y-2">
                    {["React", "PostgreSQL", "Redis"].map((s) => (
                      <label key={s} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedStacks.includes(s)}
                          onChange={() => toggleStack(s)}
                        />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* DOMAIN */}
              <div className="mb-6">
                <button
                  className="flex justify-between w-full"
                  onClick={() => setDomainOpen(!domainOpen)}
                >
                  <span className="font-semibold text-gray-900">Domain</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      domainOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {domainOpen && (
                  <div className="mt-3 space-y-2">
                    {["Healthcare", "Education", "Environment", "Finance"].map(
                      (d) => (
                        <label key={d} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedDomains.includes(d)}
                            onChange={() => toggleDomain(d)}
                          />
                          <span>{d}</span>
                        </label>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* APPLY + RESET BUTTONS */}
              <div className="mt-auto flex flex-col gap-2 pt-4 border-t">
                <button
                  onClick={applyFilters}
                  className="bg-purple-600 text-white w-full py-2 rounded"
                >
                  Apply
                </button>
                <button
                  onClick={resetFilters}
                  className="text-purple-600 border border-purple-600 w-full py-2 rounded"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =============================== */}
        {/* CONTENT RIGHT AREA              */}
        {/* =============================== */}
        <div className="flex-1">
          {/* TOP BAR */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" /> Filter
            </button>

            <input
              type="text"
              placeholder="Search projects..."
              className="px-4 py-2 border rounded w-full max-w-xs"
            />
          </div>

          {/* PROJECT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="border rounded-lg overflow-hidden">
                <img src={p.image} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================ */}
      {/* RIGHT DRAWER FOR MOBILE/TABLET (SLIDE FROM RIGHT) */}
      {/* ================================================ */}
      {!isDesktop && (
        <div
          className={`fixed inset-0 z-40 transition-all ${
            isFilterOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity ${
              isFilterOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsFilterOpen(false)}
          />

          {/* Drawer */}
          <div
            className={`absolute right-0 top-0 h-full bg-white shadow-xl transition-transform
            ${
              isFilterOpen ? "translate-x-0" : "translate-x-full"
            } w-full sm:w-4/5 max-w-sm`}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button className="p-2" onClick={() => setIsFilterOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
              {/* Desktop filter content reused exactly here */}
              {/* BATCH */}
              <div className="mb-6">
                <button
                  className="flex justify-between w-full"
                  onClick={() => setBatchOpen(!batchOpen)}
                >
                  <span className="font-semibold text-gray-900">Batch</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      batchOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {batchOpen && (
                  <div className="mt-3 space-y-2">
                    {["Batch 1", "Batch 2", "Batch 3"].map((b) => (
                      <label key={b} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedBatches.includes(b)}
                          onChange={() => toggleBatch(b)}
                        />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* STACK */}
              <div className="mb-6">
                <button
                  className="flex justify-between w-full"
                  onClick={() => setStackOpen(!stackOpen)}
                >
                  <span className="font-semibold text-gray-900">
                    Tech Stack
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      stackOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {stackOpen && (
                  <div className="mt-3 space-y-2">
                    {["React", "PostgreSQL", "Redis"].map((s) => (
                      <label key={s} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedStacks.includes(s)}
                          onChange={() => toggleStack(s)}
                        />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* DOMAIN */}
              <div>
                <button
                  className="flex justify-between w-full"
                  onClick={() => setDomainOpen(!domainOpen)}
                >
                  <span className="font-semibold text-gray-900">Domain</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      domainOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {domainOpen && (
                  <div className="mt-3 space-y-2">
                    {["Healthcare", "Education", "Environment", "Finance"].map(
                      (d) => (
                        <label key={d} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedDomains.includes(d)}
                            onChange={() => toggleDomain(d)}
                          />
                          <span>{d}</span>
                        </label>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* APPLY + RESET (MOBILE/TABLET) */}
            <div className="p-4 border-t flex flex-col gap-3">
              <button
                onClick={applyFilters}
                className="bg-purple-600 text-white py-2 rounded"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectShowcase;
