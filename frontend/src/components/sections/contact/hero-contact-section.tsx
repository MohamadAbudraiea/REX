import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageSquare } from "lucide-react";

export function HeroContactSection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-muted/30 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6"
          >
            <MessageSquare className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t("contact.hero.title")}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {t("contact.hero.subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
