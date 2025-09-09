import { motion } from "framer-motion";
import { Car, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
function WashServicePage() {
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <div
              className={`flex items-center ${
                locale === "ar" ? "space-x-reverse space-x-4" : "space-x-4"
              } mb-6`}
            >
              <div className="p-4 rounded-full bg-primary/10">
                <Car className="h-8 w-8 text-primary" />
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                {t("services.items.wash.title")}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("services.items.wash.description")}
            </p>
            <Link
              to="/booking"
              className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-full"
            >
              {t("services.book")}
            </Link>
          </div>
          <div className="relative">
            <img
              src="/wash-service.jpg"
              alt="Car Wash Service"
              className="rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WashServicePage;
