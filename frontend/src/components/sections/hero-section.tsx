import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const acronymParts = [
    { letter: "B", explanation: t("home.hero.acronym.B") },
    { letter: "L", explanation: t("home.hero.acronym.L") },
    { letter: "I", explanation: t("home.hero.acronym.I") },
    { letter: "N", explanation: t("home.hero.acronym.N") },
    { letter: "K", explanation: t("home.hero.acronym.K") },
  ];
  const reversedAcronymParts = [
    { letter: "K", explanation: t("home.hero.acronym.K") },
    { letter: "N", explanation: t("home.hero.acronym.N") },
    { letter: "I", explanation: t("home.hero.acronym.I") },
    { letter: "L", explanation: t("home.hero.acronym.L") },
    { letter: "B", explanation: t("home.hero.acronym.B") },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background  to-muted/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex flex-col items-center space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-wider">
                <div className="flex justify-center">
                  {locale === "en"
                    ? acronymParts.map((part, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex flex-col items-center mx-2 relative"
                        >
                          {/* Flash icon above the letter I */}
                          {part.letter === "I" && (
                            <motion.img
                              src="/flash.png"
                              alt="Flash"
                              className="absolute left-1/2 -translate-x-1/2 -top-6 w-10 h-10"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ duration: 0.7, delay: 0.5 }}
                            />
                          )}
                          <span className="text-primary text-6xl sm:text-7xl lg:text-8xl">
                            {part.letter}
                          </span>
                          <span className="text-xs sm:text-sm font-normal text-muted-foreground mt-1 max-w-[80px] text-center leading-tight">
                            {part.explanation}
                          </span>
                        </motion.div>
                      ))
                    : reversedAcronymParts.map((part, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex flex-col items-center mx-2 relative"
                        >
                          {/* Flash icon above the letter I */}
                          {part.letter === "I" && (
                            <motion.img
                              src="/flash.png"
                              alt="Flash"
                              className="absolute left-1/2 -translate-x-1/2 -top-6 w-10 h-10"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ duration: 0.7, delay: 0.5 }}
                            />
                          )}
                          <span className="text-primary text-6xl sm:text-7xl lg:text-8xl">
                            {part.letter}
                          </span>
                          <span className="text-xs sm:text-sm font-normal text-muted-foreground mt-1 max-w-[80px] text-center leading-tight">
                            {part.explanation}
                          </span>
                        </motion.div>
                      ))}
                </div>
              </h1>
            </div>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {t("home.hero.description")}
            </motion.p>
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
