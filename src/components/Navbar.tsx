
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

export const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <nav className="bg-primary/10 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`text-primary hover:text-primary/80 transition-colors ${
                location.pathname === "/" ? "font-semibold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/planner"
              className={`text-primary hover:text-primary/80 transition-colors ${
                location.pathname === "/planner" ? "font-semibold" : ""
              }`}
            >
              {t('planner')}
            </Link>
            <Link
              to="/series"
              className={`text-primary hover:text-primary/80 transition-colors ${
                location.pathname.startsWith("/series") ? "font-semibold" : ""
              }`}
            >
              {t('series')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
