import { useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';

export default function SuccessStoryPage() {
  const [selectedBatches, setSelectedBatches] = useState<number[]>([1, 2]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>(['Frontend Engineer', 'AI Researcher']);
  const [selectedStatus, setSelectedStatus] = useState<string[]>(['Hired']);
  const [showFilters, setShowFilters] = useState(false);

  const toggleBatch = (batch: number) => {
    setSelectedBatches(prev => 
      prev.includes(batch) ? prev.filter(b => b !== batch) : [...prev, batch]
    );
  };

  const togglePosition = (position: string) => {
    setSelectedPositions(prev => 
      prev.includes(position) ? prev.filter(p => p !== position) : [...prev, position]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatus(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-48 md:h-64 bg-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40">
          <img 
            src="/story/dhruv.png" 
            alt="Alumni Success" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 h-full flex items-center px-6 md:px-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
            Alumni Success Stories
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* Our Program's Impact */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Program's Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">###</h3>
              <p className="text-gray-600">Description</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">###</h3>
              <p className="text-gray-600">Description</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">###</h3>
              <p className="text-gray-600">Description</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-12 mb-12">
          {/* Testimonial 1 */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-48 h-48 flex-shrink-0">
              <img 
                src="/story/dhruv.png" 
                alt="Dhiva Manghara" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="flex-1">
              <p className="text-lg md:text-xl italic mb-3">
                "It is amazing since I get to improve my skills (hard and soft skills), gain connections, and gain experience."
              </p>
              <p className="text-gray-600 font-medium">Dhiva Manghara</p>
            </div>
          </div>

          {/* Testimonial 2 - Right aligned */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-6">
            <div className="w-48 h-48 flex-shrink-0">
              <img 
                src="/story/dhruv.png" 
                alt="Dhiva Manghara" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="flex-1 md:text-right">
              <p className="text-lg md:text-xl italic mb-3">
                "The Industry Visit event through KADA Connect was a game-changer. Met amazing companies and got multiple job offers!"
              </p>
              <p className="text-gray-600 font-medium">Dhiva Manghara</p>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-48 h-48 flex-shrink-0">
              <img 
                src="/story/dhruv.png" 
                alt="Dhiva Manghara" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="flex-1">
              <p className="text-lg md:text-xl italic mb-3">
                "It is amazing since I get to improve my skills (hard and soft skills), gain connections, and gain experience."
              </p>
              <p className="text-gray-600 font-medium">Dhiva Manghara</p>
            </div>
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
        {(selectedBatches.length > 0 || selectedPositions.length > 0 || selectedStatus.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedBatches.length > 0 && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                Batch: #{selectedBatches.join(', #')}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBatches([])} />
              </span>
            )}
            {selectedPositions.length > 0 && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                Position: {selectedPositions.join(', ')}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedPositions([])} />
              </span>
            )}
            {selectedStatus.length > 0 && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-2">
                Status: {selectedStatus.join(', ')}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedStatus([])} />
              </span>
            )}
            <button 
              className="text-purple-600 text-sm font-medium"
              onClick={() => {
                setSelectedBatches([]);
                setSelectedPositions([]);
                setSelectedStatus([]);
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

                {/* Position Filter */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold">Position</h3>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="space-y-2">
                    {['Frontend Engineer', 'AI Researcher', 'Data Scientist'].map(position => (
                      <label key={position} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPositions.includes(position)}
                          onChange={() => togglePosition(position)}
                          className="w-4 h-4 text-purple-600"
                        />
                        <span>{position}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold">Status</h3>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <div className="space-y-2">
                    {['Hired', 'Freelance'].map(status => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStatus.includes(status)}
                          onChange={() => toggleStatus(status)}
                          className="w-4 h-4 text-purple-600"
                        />
                        <span>{status}</span>
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
            <div className="hidden lg:block lg:col-span-1 space-y-6">
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

              {/* Position Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold">Position</h3>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="space-y-2">
                  {['Frontend Engineer', 'AI Researcher', 'Data Scientist'].map(position => (
                    <label key={position} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPositions.includes(position)}
                        onChange={() => togglePosition(position)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span>{position}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold">Status</h3>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <div className="space-y-2">
                  {['Hired', 'Freelance'].map(status => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStatus.includes(status)}
                        onChange={() => toggleStatus(status)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Stories Grid */}
          <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img 
                    src="/story/dhruv.png" 
                    alt="Success Story" 
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2">Building My Own Company with a Non Tech Background</h4>
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