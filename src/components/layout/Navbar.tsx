import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  ChevronDown,
  BookImage,
  Megaphone,
  Pickaxe,
} from "lucide-react";
import KADALOGO from "@/assets/logo/kada-logo.png";
import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { accessToken, user, profile, role, clearAuth, isAuthLoaded } =
    useAuthStore();

  if (!isAuthLoaded) return null;

  const isLoggedIn = !!accessToken;

  const displayName =
    profile?.fullName || user?.user_metadata?.fullName || user?.email || "User";

const avatarUrl =
  role === "student"
    ? profile?.profilePhoto || null
    : role === "company"
    ? profile?.logo || null
    : null;
  const hasProfile = !!profile;

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
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAboutMobileOpen, setIsAboutMobileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);

  const isActive = (path: string) => location.pathname === path;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }

      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setIsAboutOpen(false);
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
      <div className="max-w-7xl mx-auto flex h-16 items-center px-4 md:px-6">
        {/* ================= LEFT GROUP ================= */}
        <div className="flex items-center gap-6">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img src={KADALOGO} className="w-20" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-3">
            {/* HOME */}
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                isActive("/")
                  ? "text-primary bg-primary/10"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>

            {/* ABOUT DROPDOWN */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="cursor-pointer flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                About
                <ChevronDown className="w-4 h-4" />
              </button>

              {isAboutOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-xl overflow-hidden animate-scale-in">
                  <Link
                    to="/about/gallery"
                    onClick={() => setIsAboutOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                  >
                    <BookImage className="w-4 h-4" />
                    KADA Galery
                  </Link>

                  <Link
                    to="/about/project"
                    onClick={() => setIsAboutOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                  >
                    <Pickaxe className="w-4 h-4" />
                    Capstone Projects
                  </Link>

                  <Link
                    to="/about/story"
                    onClick={() => setIsAboutOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                  >
                    <Megaphone className="w-4 h-4" />
                    Blogs & Success Story
                  </Link>
                </div>
              )}
            </div>

            {/* AUTH ONLY */}
            {isLoggedIn && (
              <>
                <Link
                  to="/trainees"
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isActive("/trainees")
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Trainees
                </Link>

                <Link
                  to="/companies"
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isActive("/companies")
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Companies
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* ================= RIGHT GROUP ================= */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          {!isLoggedIn && (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg text-sm cursor-pointer font-semibold text-white bg-primary hover:bg-primary/80 shadow-sm"
            >
              Login
            </button>
          )}

          {isLoggedIn && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-full px-2 py-1 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full border flex items-center justify-center overflow-hidden bg-gray-100">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 min-w-[320px] bg-white shadow-xl rounded-xl overflow-hidden animate-scale-in">
                  <div className="flex items-center gap-3 p-4 border-b">
                    <div className="w-12 h-12 rounded-full border flex items-center justify-center overflow-hidden bg-gray-100">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{displayName}</p>
                      <p className="text-xs text-gray-600 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={profileLink}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                  >
                    <User className="w-5 h-5" />
                    My Profile
                  </Link>

                  {role === "admin" && (
                    <Link
                      to="/admin/users"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
                    >
                      <Settings className="w-5 h-5" />
                      Manage Users
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 w-full border-t"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-3">
          {/* HOME */}
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-gray-800"
          >
            Home
          </Link>

          {/* ABOUT ACCORDION */}
          <div>
            <button
              onClick={() => setIsAboutMobileOpen(!isAboutMobileOpen)}
              className="w-full flex items-center justify-between py-2 text-gray-800"
            >
              <span>About</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform cursor-pointer ${
                  isAboutMobileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isAboutMobileOpen && (
              <div className="ml-4 mt-2 space-y-2 border-l pl-4">
                <Link
                  to="/about/gallery"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 py-1 text-sm text-gray-700"
                >
                  <BookImage className="w-4 h-4" />
                  KADA Gallery
                </Link>

                <Link
                  to="/about/project"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 py-1 text-sm text-gray-700"
                >
                  <Pickaxe className="w-4 h-4" />
                  Capstone Projects
                </Link>

                <Link
                  to="/about/story"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 py-1 text-sm text-gray-700"
                >
                  <Megaphone className="w-4 h-4" />
                  Blogs & Success Story
                </Link>
              </div>
            )}
          </div>

          {/* AUTH ONLY */}
          {isLoggedIn && (
            <>
              <Link
                to="/trainees"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-800"
              >
                Trainees
              </Link>

              <Link
                to="/companies"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-800"
              >
                Companies
              </Link>
            </>
          )}

          {/* GUEST */}
          {!isLoggedIn && (
            <button
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
              className="w-full py-2 rounded-lg text-white bg-primary"
            >
              Login
            </button>
          )}

          {/* LOGGED IN */}
          {isLoggedIn && (
            <>
              <hr />
              <Link
                to={profileLink}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-gray-700"
              >
                My Profile
              </Link>

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
