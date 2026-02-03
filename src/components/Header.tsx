import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Image,
  Calendar,
  MapPin,
  BarChart3,
  BookOpen,
  MessageCircle,
  Users,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccommodation } from "@/contexts/AccommodationContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [logoDropdownOpen, setLogoDropdownOpen] = useState(false);
  const location = useLocation();
  const { accommodation } = useAccommodation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getBasePath = () => {
    if (location.pathname.startsWith("/pineta8")) return "/pineta8";
    if (location.pathname.startsWith("/pineta3")) return "/pineta3";
    return "/";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Verifica se l'utente è autenticato al caricamento e quando cambia il localStorage
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("calendarAuth");
      if (authStatus) {
        const { timestamp, authenticated } = JSON.parse(authStatus);
        const now = new Date().getTime();
        // Autenticazione valida per 24 ore
        setIsAuthenticated(
          authenticated && now - timestamp < 24 * 60 * 60 * 1000,
        );
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // Ascolta i cambiamenti del localStorage
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Cleanup body scroll on component unmount
  useEffect(() => {
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "unset";
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLogoDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const basePath = getBasePath();
  // Normalize basePath so that when it's root ("/") we don't produce "//route" links
  const basePathNormalized = basePath === "/" ? "" : basePath;

  // Determina se siamo nella home degli alloggi (pineta3 o pineta8)
  const isAccommodationHome =
    location.pathname === "/pineta3" || location.pathname === "/pineta8";

  const navigation = [
    // Home sempre porta alla pagina dell'alloggio corrente (pineta3 o pineta8)
    { name: "Home", href: basePathNormalized || "/pineta3", icon: Home },
    { name: "Chi Siamo", href: "/chi-siamo", icon: Users },
    { name: "Galleria", href: `${basePathNormalized}/gallery`, icon: Image },
    {
      name: "Attrazioni",
      href: "/attractions",
      icon: MapPin,
    },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "FAQ", href: "/faq", icon: MessageCircle },
    { name: "Prenota", href: `${basePathNormalized}/book`, icon: Calendar },
  ];

  // Aggiungi il link alla dashboard solo per gli utenti autenticati
  const adminNavigation = isAuthenticated
    ? [{ name: "Dashboard", href: "/dashboard", icon: BarChart3 }]
    : [];

  // Combina la navigazione normale con quella admin
  const fullNavigation = [...navigation, ...adminNavigation];

  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);

    // Prevent body scroll when mobile menu is open
    if (newState) {
      // Save current scroll position
      setScrollPosition(window.scrollY);
      // Prevent scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore scrolling
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollPosition);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    // Restore scrolling
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollPosition);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "glass py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setLogoDropdownOpen(!logoDropdownOpen)}
            className="flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer"
          >
            <img
              src="/images/logo.nobg.png"
              alt="Immerso nella Pineta Logo"
              className="h-12 w-auto"
            />
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "font-serif text-lg font-semibold tracking-tight transition-colors",
                  isScrolled || !isAccommodationHome
                    ? "text-foreground"
                    : "text-white drop-shadow-lg",
                )}
              >
                {accommodation.shortName}
                <span
                  className={cn(
                    "block text-xs font-normal transition-colors",
                    isScrolled || !isAccommodationHome
                      ? "text-muted-foreground"
                      : "text-white/90 drop-shadow-md",
                  )}
                >
                  Pinarella di Cervia
                </span>
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-all ml-1",
                  isScrolled || !isAccommodationHome
                    ? "text-foreground"
                    : "text-white drop-shadow-md",
                  logoDropdownOpen && "rotate-180",
                )}
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          {logoDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
              <Link
                to="/pineta3"
                onClick={() => setLogoDropdownOpen(false)}
                className="block px-4 py-3 hover:bg-pine-light/20 transition-colors"
              >
                <div className="font-semibold text-pine-dark">Pineta 3</div>
                <div className="text-xs text-gray-600">
                  Piano terra • 4 ospiti
                </div>
              </Link>
              <Link
                to="/pineta8"
                onClick={() => setLogoDropdownOpen(false)}
                className="block px-4 py-3 hover:bg-sea-light/20 transition-colors"
              >
                <div className="font-semibold text-sea-dark">Pineta 8</div>
                <div className="text-xs text-gray-600">
                  Secondo piano • 6 ospiti
                </div>
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <Link
                to="/"
                onClick={() => setLogoDropdownOpen(false)}
                className="block px-4 py-3 hover:bg-gray-100 transition-colors font-semibold text-pine-dark"
              >
                Vedi tutti gli alloggi
              </Link>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {fullNavigation.map((item) => {
            // Per la pagina attractions, verifica esatta del path senza basePath
            const isActive =
              item.href === "/attractions"
                ? location.pathname === "/attractions"
                : location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative px-1 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-pine-dark after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-pine-dark"
                    : isScrolled || !isAccommodationHome
                      ? "text-foreground hover:text-pine-dark"
                      : "text-white hover:text-white/80 drop-shadow-md",
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center p-2 relative z-50"
          aria-label="Toggle mobile menu"
        >
          <div className="space-y-1.5 relative transition-all">
            <span
              className={cn(
                "block h-0.5 w-6 rounded-full transition-all",
                isScrolled || !isAccommodationHome
                  ? "bg-foreground"
                  : "bg-white drop-shadow-md",
                mobileMenuOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 rounded-full transition-all",
                isScrolled || !isAccommodationHome
                  ? "bg-foreground"
                  : "bg-white drop-shadow-md",
                mobileMenuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 rounded-full transition-all",
                isScrolled || !isAccommodationHome
                  ? "bg-foreground"
                  : "bg-white drop-shadow-md",
                mobileMenuOpen && "-translate-y-2 -rotate-45",
              )}
            />
          </div>
        </button>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed top-0 left-0 w-screen h-screen z-40 glass transition-all duration-300 md:hidden",
            mobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
          style={{ height: "100vh", width: "100vw" }}
        >
          <nav className="flex flex-col items-center justify-center h-full">
            {fullNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-5 py-4 text-lg font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-pine-dark"
                    : "text-foreground",
                )}
                onClick={closeMobileMenu}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
