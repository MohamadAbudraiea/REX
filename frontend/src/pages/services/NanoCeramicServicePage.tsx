import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Shield, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function NanoCeramicServicePage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/services"
          className={`inline-flex items-center text-primary hover:text-primary/80 mb-8 ${
            locale === "ar" ? "space-x-reverse space-x-2" : "space-x-2"
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t("services.back")}</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {t("services.coating.title")}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {t("services.coating.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <div
              className={`flex items-center ${
                locale === "ar" ? "space-x-reverse space-x-4" : "space-x-4"
              } mb-6`}
            >
              <div className="p-4 rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t("services.nano.title")}
              </h2>
            </div>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("services.nano.description")}
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              {t("services.book_now")}
            </Button>
          </div>
          <div className="relative">
            <img
              src="/nano-ceramic-graphene-service.jpg"
              alt="Nano Ceramic Coating"
              className="rounded-lg shadow-lg"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="relative lg:order-1">
            <img
              src="/nano-ceramic-graphene-service.jpg"
              alt="Graphene Coating"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:order-2">
            <div
              className={`flex items-center ${
                locale === "ar" ? "space-x-reverse space-x-4" : "space-x-4"
              } mb-6`}
            >
              <div className="p-4 rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t("services.graphene.title")}
              </h2>
            </div>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("services.graphene.description")}
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              {t("services.book_now")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default NanoCeramicServicePage;
