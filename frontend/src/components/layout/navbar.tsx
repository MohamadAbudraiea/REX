import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCheckAuth, useLogout } from "@/hooks/useAuth";
import { useTheme } from "@/context/theme-provider";

export default function Navbar() {
  const { isAuthenticated } = useCheckAuth();
  const { logoutMutation, isPending: isLoggingOut } = useLogout();
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = i18n.language === "ar";

  const handdleLogout = () => {
    logoutMutation();
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={theme === "light" ? "/white-logo.png" : "/dark-logo.png"}
              alt="BLINK Logo"
              className="h-25 w-25"
            />
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/services"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {t("nav.services")}
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {t("nav.about")}
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {t("nav.contact")}
              </Link>
              {isAuthenticated && (
                <Link
                  to="/my-bookings"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {t("nav.my_bookings")}
                </Link>
              )}
            </div>
          </div>

          {/* side controls */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
            {isAuthenticated ? (
              <div
                className={`hidden md:flex items-center ml-4 ${
                  isRTL ? "space-x-reverse space-x-2" : "space-x-2"
                }`}
              >
                <Button
                  onClick={handdleLogout}
                  disabled={isLoggingOut}
                  className="bg-destructive hover:bg-destructive/90"
                  variant="destructive"
                  size="sm"
                  asChild
                >
                  <span>
                    {isLoggingOut ? t("nav.logging_out") : t("nav.logout")}
                  </span>
                </Button>
              </div>
            ) : (
              <div
                className={`hidden md:flex items-center ml-4 ${
                  isRTL ? "space-x-reverse space-x-2" : "space-x-2"
                }`}
              >
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">{t("nav.login")}</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-primary hover:bg-primary/90"
                >
                  <Link to="/signup">{t("nav.signup")}</Link>
                </Button>
              </div>
            )}

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{t("nav.menu")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side={isRTL ? "left" : "right"}
                className="w-[300px] sm:w-[400px]"
              >
                <SheetHeader>
                  <SheetTitle
                    className={`flex items-center ${
                      isRTL ? "justify-end" : "justify-start"
                    }`}
                  >
                    <img
                      src={
                        theme === "light" ? "/white-logo.png" : "/dark-logo.png"
                      }
                      alt="BLINK Logo"
                      className="h-25 w-25"
                    />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    to="/"
                    className={`text-lg font-medium text-foreground/80 hover:text-foreground transition-colors ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.home")}
                  </Link>
                  <Link
                    to="/services"
                    className={`text-lg font-medium text-foreground/80 hover:text-foreground transition-colors ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.services")}
                  </Link>
                  <Link
                    to="/about"
                    className={`text-lg font-medium text-foreground/80 hover:text-foreground transition-colors ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.about")}
                  </Link>
                  <Link
                    to="/contact"
                    className={`text-lg font-medium text-foreground/80 hover:text-foreground transition-colors ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.contact")}
                  </Link>

                  {isAuthenticated && (
                    <Link
                      to="/my-bookings"
                      className={`text-lg font-medium text-foreground/80 hover:text-foreground transition-colors ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t("nav.my_bookings")}
                    </Link>
                  )}

                  {isAuthenticated ? (
                    <div className="flex flex-col space-y-3 pt-4 border-t">
                      <Button
                        variant="destructive"
                        asChild
                        className="justify-start hover:bg-destructive"
                      >
                        <span>
                          {isLoggingOut
                            ? t("nav.logging_out")
                            : t("nav.logout")}
                        </span>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3 pt-4 border-t">
                      <Button variant="ghost" asChild className="justify-start">
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          {t("nav.login")}
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="bg-primary hover:bg-primary/90 justify-start"
                      >
                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                          {t("nav.signup")}
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
