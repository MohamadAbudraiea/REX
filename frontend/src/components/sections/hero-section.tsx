import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <img
                  src="/logo.png"
                  alt="REX CAR Logo"
                  className="w-48 h-auto sm:w-56 lg:w-64"
                />
              </motion.div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-wider">
                <span className="text-primary">R.E.X</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {t("home.hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link
                to="/booking"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300"
              >
                {t("home.hero.cta")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
