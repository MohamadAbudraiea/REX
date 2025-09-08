import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and tagline */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="REX CAR" className="h-20 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {t("footer.tagline")}
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {t("footer.company")}.{" "}
              {t("footer.rights")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm mb-4">
              {t("footer.services")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/services/wash"
                  className="hover:text-foreground transition-colors"
                >
                  {t("home.services.wash.title")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/dryclean"
                  className="hover:text-foreground transition-colors"
                >
                  {t("home.services.dryclean.title")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/polish"
                  className="hover:text-foreground transition-colors"
                >
                  {t("home.services.polish.title")}
                </Link>
              </li>
              <li>
                <Link
                  to="/services/nano"
                  className="hover:text-foreground transition-colors"
                >
                  {t("home.services.nano.title")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm mb-4">
              {t("footer.company_info")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/about"
                  className="hover:text-foreground transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  {t("footer.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
