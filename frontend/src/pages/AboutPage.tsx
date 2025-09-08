import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const values = [
    {
      titleKey: "about.values.quality",
      descriptionKey: "about.values.quality.desc",
    },
    {
      titleKey: "about.values.customer",
      descriptionKey: "about.values.customer.desc",
    },
    {
      titleKey: "about.values.innovation",
      descriptionKey: "about.values.innovation.desc",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center content-center">
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                {t("about.hero.title")}
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("about.story.content")}
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t("about.hero.subtitle")}
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                {t("home.hero.cta")}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/about-3.png"
                alt="REX CAR Mobile App"
                className="w-full max-w-md mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={locale === "ar" ? "lg:order-2" : ""}
            >
              <img
                src="/about-2.png"
                alt="REX CAR Brand Materials"
                className="w-full rounded-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={locale === "ar" ? "lg:order-1" : ""}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t("about.story.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("about.story.content")}
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("about.mission.content")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t("about.values.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("about.values.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {t(value.titleKey)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(value.descriptionKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {t("about.team.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("about.team.content")}
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t("about.team.content2")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: locale === "ar" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src="/about-1.png"
                alt="REX CAR Team Uniform"
                className="w-full max-w-md mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
