import { Linkedin, Youtube } from "lucide-react";
import eliceLogo from "@/assets/logo/eliceCI.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Top Section - Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              KADA Connect
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Bridging talent and opportunity between Korea-ASEAN digital
              professionals and industry leaders.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/companies"
                  className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Companies
                </a>
              </li>
              <li>
                <a
                  href="/trainees"
                  className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  Trainees
                </a>
              </li>
              <li>
                <a
                  href="https://elice.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  About Elice
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/elice/"
                className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@elice_official"
                className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
                aria-label="GitHub"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Left side */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>© {new Date().getFullYear()} KADA Connect</span>
              <span className="hidden md:inline text-gray-300">•</span>
              <div className="flex items-center gap-1 text-gray-500">
                <span>Powered by</span>
                <img
                  src={eliceLogo}
                  alt="Elice logo"
                  className="h-4 w-auto shrink-0"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4 text-sm">
              <Link
               target="_blank"
                to="/terms-of-service?tab=privacy"
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-300">•</span>
              <Link
               target="_blank"
                to="/terms-of-service?tab=terms"
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
