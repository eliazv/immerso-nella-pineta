import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  TreePine,
  Waves,
  Home,
  Image,
  ScrollText,
  Calendar,
  MapPin,
  BarChart3,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccommodation } from "@/contexts/AccommodationContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  const { accommodation } = useAccommodation();
  
  const getBasePath = () => {
    if (location.pathname.startsWith('/pineta8')) return '/pineta8';
    if (location.pathname.startsWith('/pineta3')) return '/pineta3';
    return '/';
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
          authenticated && now - timestamp < 24 * 60 * 60 * 1000
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
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = 'unset';
    };
  }, []);

  const basePath = getBasePath();
  const navigation = [
    { name: "Home", href: basePath || "/", icon: Home },
    { name: "Galleria", href: `${basePath}/gallery`, icon: Image },
    { name: "Attrazioni", href: `${basePath}/attractions`, icon: MapPin },
    { name: "Blog", href: "/blog", icon: BookOpen },
    { name: "FAQ", href: "/faq", icon: MessageCircle },
    { name: "Prenota", href: `${basePath}/book`, icon: Calendar },
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
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scrolling
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    // Restore scrolling
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPosition);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled ? "glass py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
          onClick={closeMobileMenu}
        >
          <div className="relative flex items-center">
            <TreePine className="text-pine-dark h-6 w-6" />
            <Waves className="text-sea-dark h-6 w-6 absolute left-3" />
          </div>
          <span className="font-serif text-pine text-lg font-semibold tracking-tight text-foreground">
            {accommodation.shortName}
            <span className="block text-xs text-sea text-muted-foreground font-normal">
              Appartamento a Pinarella di Cervia
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {fullNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "relative px-1 py-2 text-sm font-medium transition-colors hover:text-pine-dark",
                location.pathname === item.href
                  ? "text-pine-dark after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-pine-dark"
                  : "text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
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
                "block h-0.5 w-6 bg-foreground rounded-full transition-all",
                mobileMenuOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-foreground rounded-full transition-all",
                mobileMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 bg-foreground rounded-full transition-all",
                mobileMenuOpen && "-translate-y-2 -rotate-45"
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
              : "opacity-0 pointer-events-none"
          )}
          style={{ height: '100vh', width: '100vw' }}
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
                    : "text-foreground"
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
