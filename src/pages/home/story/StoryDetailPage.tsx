import { Share2 } from 'lucide-react';

export default function SuccessStoryDetail() {
  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 gap-12">
            {/* Left Column - Title and Content */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight">
                Building My Own Company with a Non Tech Background
              </h1>
              
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  See Profile
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                
                <p>
                  Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in nibh. Quisque volutpat condimentum vititi. Cras aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="text-xl italic text-center">
                  "It is amazing since I get to improve my skills (hard and soft skills), gain connections, and gain experience."
                </p>
              </div>

              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">#tag1</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">#tag2</span>
              </div>
            </div>

            {/* Right Column - Image */}
            <div>
              <img 
                src="/story/samuel.png" 
                alt="Success Story" 
                className="w-full h-auto rounded-lg shadow-lg sticky top-6"
              />
            </div>
          </div>

          {/* See more Stories */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">See more Stories</h2>
            <div className="grid grid-cols-3 gap-6">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <img 
                    src="/story/samuel.png" 
                    alt="Story" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">Building My Own Company with a Non Tech Background</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="px-4 py-6 space-y-6">
          {/* Image */}
          <div>
            <img 
              src="/story/samuel.png" 
              alt="Success Story" 
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold leading-tight">
            Building My Own Company with a Non Tech Background
          </h1>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
              See Profile
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            
            <p>
              Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in nibh. Quisque volutpat condimentum vititi. Cras aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante.
            </p>
          </div>

          {/* Quote */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <p className="text-lg italic text-center">
              "It is amazing since I get to improve my skills (hard and soft skills), gain connections, and gain experience."
            </p>
          </div>

          {/* Tags */}
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">#tag1</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">#tag2</span>
          </div>

          {/* See more Stories */}
          <div className="pt-6">
            <h2 className="text-xl font-bold mb-4">See more Stories</h2>
            <div className="space-y-4">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <img 
                    src="/story/samuel.png" 
                    alt="Story" 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold">Building My Own Company with a Non Tech Background</h3>
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