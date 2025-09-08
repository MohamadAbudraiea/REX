import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Ahmed Al-Rashid",
    rating: 5,
    comment:
      "Exceptional service! My car looks brand new after the nano ceramic treatment. The team is professional and attention to detail is outstanding.",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Best car wash in the city! The polish service made my car shine like never before. Highly recommend REX CAR for premium car care.",
    date: "2024-01-10",
  },
  {
    id: 3,
    name: "Mohammed Hassan",
    rating: 4,
    comment:
      "Great dry cleaning service for my car's interior. The staff is friendly and the results exceeded my expectations. Will definitely come back.",
    date: "2024-01-08",
  },
  {
    id: 4,
    name: "Emily Chen",
    rating: 5,
    comment:
      "Amazing graphene coating service! My car has been protected for months now and still looks incredible. Worth every penny.",
    date: "2024-01-05",
  },
  {
    id: 5,
    name: "Omar Abdullah",
    rating: 5,
    comment:
      "Professional wash service with premium products. The team takes care of every detail and the results are always perfect.",
    date: "2024-01-03",
  },
  {
    id: 6,
    name: "Lisa Martinez",
    rating: 4,
    comment:
      "Excellent service quality and customer care. The nano ceramic treatment has kept my car looking pristine for months.",
    date: "2024-01-01",
  },
];

export function ReviewsSection() {
  const { t, i18n } = useTranslation();

  const locale = i18n.language;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("home.reviews.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("home.reviews.description")}
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            reverseDirection: locale === "ar", // Reverse direction for Arabic
          }}
          speed={800}
          dir={locale === "ar" ? "rtl" : "ltr"} // Set direction based on language
          key={locale} // Force re-render when language changes
          className={locale === "ar" ? "swiper-rtl" : ""}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="!w-80">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div
                      className={`flex items-center justify-between mb-4 ${
                        locale === "ar" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`flex ${
                          locale === "ar"
                            ? "space-x-reverse space-x-1"
                            : "space-x-1"
                        }`}
                      >
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p
                      className={`text-muted-foreground mb-4 text-sm leading-relaxed ${
                        locale === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      "{review.comment}"
                    </p>
                    <div
                      className={`flex items-center ${
                        locale === "ar" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 bg-muted rounded-full flex items-center justify-center ${
                          locale === "ar" ? "ml-3" : "mr-3"
                        }`}
                      >
                        <span className="text-foreground font-semibold text-sm">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div className={locale === "ar" ? "text-right" : ""}>
                        <p className="font-semibold text-foreground text-sm">
                          {review.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Verified Customer
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
