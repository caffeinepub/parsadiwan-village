import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const host =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer className="bg-footer-bg text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Address */}
        <div>
          <h3 className="font-bold text-lg mb-3 text-orange-300 font-devanagari">
            📍 पता | Address
          </h3>
          <div className="flex items-start gap-2 text-sm text-blue-100 mb-2">
            <MapPin size={16} className="mt-0.5 flex-shrink-0" />
            <span>
              ग्राम पंचायत परसा दीवान
              <br />
              जनपद, उत्तर प्रदेश — 226001
              <br />
              Gram Panchayat Parsa Diwan, UP
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-100 mb-1">
            <Phone size={16} />
            <span>+91 9876543210</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-100">
            <Mail size={16} />
            <span>panchayat.parsadiwan@up.gov.in</span>
          </div>
        </div>

        {/* Sitemap */}
        <div>
          <h3 className="font-bold text-lg mb-3 text-orange-300">
            🗺️ साइटमैप | Sitemap
          </h3>
          <ul className="space-y-1 text-sm">
            {[
              { label: "होम | Home", path: "/" },
              { label: "हमारे बारे में | About", path: "/about" },
              { label: "डाउनलोड | Downloads", path: "/downloads" },
              { label: "सूचनाएं | Notifications", path: "/notifications" },
              { label: "संपर्क | Contact", path: "/contact" },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  › {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links / Portals */}
        <div>
          <h3 className="font-bold text-lg mb-3 text-orange-300">
            🔗 महत्वपूर्ण पोर्टल | Key Portals
          </h3>
          <ul className="space-y-1 text-sm">
            {[
              {
                label: "UP Panchayat Portal",
                href: "https://egramswaraj.gov.in",
              },
              { label: "PM Awas Yojana", href: "https://pmayg.nic.in" },
              {
                label: "Jal Jeevan Mission",
                href: "https://jaljeevanmission.gov.in",
              },
              { label: "MGNREGA", href: "https://nrega.nic.in" },
              { label: "Digital India", href: "https://digitalindia.gov.in" },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  › {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-blue-300">
        © {year}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${host}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          caffeine.ai
        </a>
      </div>
    </footer>
  );
}
