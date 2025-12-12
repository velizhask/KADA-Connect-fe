import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import aseanlogo from "@/assets/logo/aseanlogo.png";
import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

const {
  accessToken,
  user,
  profile,
  role,
  clearAuth,
  isAuthLoaded,
} = useAuthStore();

if (!isAuthLoaded) return null;

const isLoggedIn = !!accessToken;

// 🔹 Nama
const displayName =
  profile?.fullName ||
  user?.user_metadata?.fullName ||
  user?.email ||
  "User";

// 🔹 Avatar
const avatar =
  profile?.profilePhoto ||
  `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}`;

// 🔹 Cek apakah sudah punya profile di BE
const hasProfile = !!profile;

// 🔹 Tentukan link My Profile
const profileLink =
  role === "admin"
    ? "/admin/users"
    : role === "company"
    ? hasProfile
      ? "/companies/me"
      : "/register/company/details"
    : role === "student"
    ? hasProfile
      ? "/trainees/me"
      : "/register/trainee/details"
    : "/";


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const isActive = (path: string) => location.pathname === path;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src={aseanlogo} className="w-10" />
          <div className="flex flex-col">
            <span className="text-base font-semibold text-gray-900">KADA Connect</span>
            <span className="text-[10px] text-gray-500 hidden sm:block">
              Korea-ASEAN Digital Academy
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-3">

          {/* ALWAYS VISIBLE */}
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isActive("/") ? "text-primary bg-primary/10" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Home
          </Link>

          {/* ONLY SHOW WHEN LOGGED IN */}
          {isLoggedIn && (
            <>
              <Link
                to="/trainees"
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive("/trainees") ? "text-primary bg-primary/10" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Trainees
              </Link>

              <Link
                to="/companies"
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive("/companies") ? "text-primary bg-primary/10" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Companies
              </Link>
            </>
          )}
        </nav>

        {/* RIGHT AUTH SECTION - DESKTOP */}
        <div className="hidden md:flex items-center gap-3">

          {/* IF NOT LOGGED IN */}
          {!isLoggedIn && (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/80 shadow-sm"
            >
              Login
            </button>
          )}

          {/* IF LOGGED IN */}
          {isLoggedIn && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100 transition"
              >
                <img src={avatar} className="w-9 h-9 rounded-full border object-cover" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-auto bg-white shadow-xl rounded-2xl overflow-hidden border-0 animate-fade">

                  {/* HEADER */}
                  <div className="flex items-center gap-3 p-4 border-b">
                    <img src={avatar} className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="font-semibold text-gray-900">{displayName}</p>
                      <p className="text-xs text-gray-600">{user?.email}</p>
                    </div>
                  </div>

                  {/* My Profile */}
                  <Link
                    to={profileLink}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-800"
                  >
                    <User className="w-5 h-5" />
                    My Profile
                  </Link>

                  {/* Admin */}
                  {role === "admin" && (
                    <Link
                      to="/admin/users"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-800"
                    >
                      <Settings className="w-5 h-5" />
                      Manage Platform
                    </Link>
                  )}

                  {/* LOGOUT */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-red-600 w-full border-t"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">

          <Link to="/" className="block text-gray-800 py-2">Home</Link>

          {/* SHOW ONLY WHEN LOGGED IN */}
          {isLoggedIn && (
            <>
              <Link to="/trainees" className="block text-gray-800 py-2">
                Trainees
              </Link>
              <Link to="/companies" className="block text-gray-800 py-2">
                Companies
              </Link>
            </>
          )}

          {/* GUEST */}
          {!isLoggedIn && (
            <button
              onClick={() => navigate("/login")}
              className="w-full py-2 mt-2 rounded-lg text-white bg-primary"
            >
              Login
            </button>
          )}

          {/* LOGGED IN */}
          {isLoggedIn && (
            <>
              <hr />

              <div className="flex items-center gap-3 py-2">
                <img src={avatar} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-sm font-semibold">{displayName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              <Link
                to={profileLink}
                className="block py-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </Link>

              {role === "admin" && (
                <Link
                  to="/admin/users"
                  className="block py-2 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Platform
                </Link>
              )}

              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block py-2 text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
