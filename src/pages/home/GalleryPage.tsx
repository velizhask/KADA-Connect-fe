import { useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';

export default function KADAJourneyPage() {
  const [selectedBatches, setSelectedBatches] = useState<number[]>([1, 2]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Photo', 'Video']);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['Opening Ceremony']);
  const [showFilters, setShowFilters] = useState(false);

  const toggleBatch = (batch: number) => {
    setSelectedBatches(prev => 
      prev.includes(batch) ? prev.filter(b => b !== batch) : [...prev, batch]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleEvent = (event: string) => {
    setSelectedEvents(prev => 
      prev.includes(event) ? prev.filter(e => e !== event) : [...prev, event]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-48 md:h-64 bg-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/40">
          <img 
           src="/story/samuel.png" 
            alt="Team working" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 h-full flex items-center px-6 md:px-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
            Explore Our Journey<br className="md:hidden" /> in KADA
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">KADA Batch 2 Indonesia</h2>

        {/* Mobile: Timeline with Images Vertical */}
        <div className="lg:hidden space-y-6 mb-8">
          {/* Opening Ceremony */}
          <div>
            <div className="flex items-start mb-3">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
              </div>
              <div>
                <h3 className="font-bold text-base">Opening Ceremony</h3>
                <p className="text-gray-600 text-sm">14 Sep 2025</p>
              </div>
            </div>
            <div className="ml-8">
              <img 
 src="/story/samuel.png" 
                alt="Opening Ceremony" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Daily Activity */}
          <div>
            <div className="flex items-start mb-3">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
              </div>
              <div>
                <h3 className="font-bold text-base">Daily Activity</h3>
                <p className="text-gray-600 text-sm">14 Sep 2025</p>
              </div>
            </div>
            <div className="ml-8">
              <img 
               src="/story/samuel.png" 
                alt="Daily Activity" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Industry Visit */}
          <div>
            <div className="flex items-start mb-3">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
              </div>
              <div>
                <h3 className="font-bold text-base">Industry Visit</h3>
                <p className="text-gray-600 text-sm">14 Sep 2025</p>
              </div>
            </div>
            <div className="ml-8">
              <img 
                src="/story/samuel.png" 
                alt="Industry Visit" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Closing Ceremony */}
          <div>
            <div className="flex items-start mb-3">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-gray-800"></div>
              </div>
              <div>
                <h3 className="font-bold text-base">Closing Ceremony</h3>
                <p className="text-gray-600 text-sm">14 Sep 2025</p>
              </div>
            </div>
            <div className="ml-8">
              <img 
                src="/story/samuel.png" 
                alt="Closing Ceremony" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Desktop: Timeline and Images Side by Side */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12">
          {/* Timeline */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {[
                { title: 'Opening Ceremony', date: '14 Sep 2025' },
                { title: 'Daily Activity', date: '14 Sep 2025' },
                { title: 'Industry Visit', date: '14 Sep 2025' },
                { title: 'Closing Ceremony', date: '14 Sep 2025' }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-4 h-4 rounded-full bg-gray-800"></div>
                      {idx < 3 && <div className="w-0.5 h-20 bg-gray-300 mt-2"></div>}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <img  src="/story/samuel.png"  alt="Event" className="w-full h-48 object-cover rounded-lg" />
            <img  src="/story/samuel.png" alt="Grand Opening" className="w-full h-48 object-cover rounded-lg" />
            <img  src="/story/samuel.png" alt="Workspace" className="w-full h-48 object-cover rounded-lg" />
            <img src="/story/samuel.png"  alt="Job Fair" className="w-full h-48 object-cover rounded-lg" />
            <img  src="/story/samuel.png"  alt="Career Fair" className="w-full h-48 object-cover rounded-lg" />
            <img  src="/story/samuel.png"  alt="Group Photo" className="w-full h-48 object-cover rounded-lg" />
          </div>
        </div>

        {/* Filter Button */}
        <div className="mb-6">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span>{showFilters ? 'Hide Filter' : 'Filter'}</span>
          </button>
        </div>

        {/* Active Filters */}
        {(selectedBatches.length > 0 || selectedTypes.length > 0 || selectedEvents.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedBatches.length > 0 && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                Batch: #{selectedBatches.join(', #')}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBatches([])} />
              </span>
            )}
            {selectedTypes.length > 0 && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                Type: {selectedTypes.join(', ')}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTypes([])} />
              </span>
            )}
            {selectedEvents.length > 0 && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                Event: {selectedEvents.join(', ')}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedEvents([])} />
              </span>
            )}
            <button 
              className="text-purple-600 text-sm font-medium"
              onClick={() => {
                setSelectedBatches([]);
                setSelectedTypes([]);
                setSelectedEvents([]);
              }}
            >
              Reset
            </button>
          </div>
        )}

        {/* Filters Sidebar - Mobile Slide from Right */}
        {showFilters && (
          <>
            {/* Backdrop */}
            <div 
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowFilters(false)}
            ></div>
            
            {/* Sidebar */}
            <div className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-xl overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <h3 className="text-lg font-bold">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Batch Filter */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold">Batch</h3>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map(batch => (
                      <label key={batch} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBatches.includes(batch)}
                          onChange={() => toggleBatch(batch)}
                          className="w-4 h-4 text-purple-600"
                        />
                        <span>Batch {batch}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold">Type</h3>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="space-y-2">
                    {['Photo', 'Video', 'Presentation'].map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => toggleType(type)}
                          className="w-4 h-4 text-purple-600"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Event Filter */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold">Event</h3>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="space-y-2">
                    {['Opening Ceremony', 'Classroom', 'Industry Visit', 'Capstone Day'].map(event => (
                      <label key={event} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedEvents.includes(event)}
                          onChange={() => toggleEvent(event)}
                          className="w-4 h-4 text-purple-600"
                        />
                        <span>{event}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-4 border-t">
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Desktop and Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters - Desktop with Toggle */}
          {showFilters && (
            <div className="lg:col-span-1 space-y-6">
              {/* Batch Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold">Batch</h3>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map(batch => (
                    <label key={batch} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBatches.includes(batch)}
                        onChange={() => toggleBatch(batch)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span>Batch {batch}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold">Type</h3>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="space-y-2">
                  {['Photo', 'Video', 'Presentation'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Event Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold">Event</h3>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="space-y-2">
                  {['Opening Ceremony', 'Classroom', 'Industry Visit', 'Capstone Day'].map(event => (
                    <label key={event} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event)}
                        onChange={() => toggleEvent(event)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span>{event}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Gallery Grid */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img 
                     src="/story/samuel.png" 
                    alt="Industry Visit" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2">Industry Visit</h4>
                    <div className="flex gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Batch 2</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Finance</span>
                    </div>
                    <p className="text-sm text-gray-600">12 Nov 2025</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}