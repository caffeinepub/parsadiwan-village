import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "होम | Home", path: "/", color: "bg-nav-orange" },
  { label: "हमारे बारे में | About", path: "/about", color: "bg-nav-green" },
  { label: "डाउनलोड | Downloads", path: "/downloads", color: "bg-nav-green" },
  {
    label: "सूचनाएं | Notifications",
    path: "/notifications",
    color: "bg-nav-blue",
  },
  { label: "संपर्क | Contact", path: "/contact", color: "bg-nav-blue" },
];

export function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link
            to="/"
            className="flex items-center gap-3"
            data-ocid="header.link"
          >
            <div className="w-16 h-16 rounded-full border-4 border-nav-orange flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 flex-shrink-0">
              <div className="text-center">
                <div className="text-nav-orange font-bold text-xs leading-tight">
                  ग्रा.पं.
                </div>
                <div className="text-nav-green text-xs leading-tight font-bold">
                  🏛️
                </div>
              </div>
            </div>
            <div>
              <div className="text-foreground font-bold text-lg leading-tight font-devanagari">
                ग्राम पंचायत पारसाडीवान
              </div>
              <div className="text-muted-foreground text-sm">
                Gram Panchayat Parsadiwan
              </div>
              <div className="text-xs text-muted-foreground">
                जिला — उत्तर प्रदेश | District — Uttar Pradesh
              </div>
            </div>
          </Link>

          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  data-ocid={`nav.${item.path.replace("/", "") || "home"}.link`}
                  className={`${item.color} text-white px-3 py-2 rounded text-xs font-semibold transition-all hover:opacity-90 ${isActive ? "nav-tab-active shadow-md" : "opacity-85"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="header.menu.toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                data-ocid={`mobile.nav.${item.path.replace("/", "") || "home"}.link`}
                className={`${item.color} text-white px-4 py-2 rounded text-sm font-semibold`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
