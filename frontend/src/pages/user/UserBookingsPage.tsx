import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import BookingCard from "@/components/user-bookings/BookingCard";
import { useGetUserTickets } from "@/hooks/useUser";

export default function UserBookingsPage() {
  const { tickets = [], isGettingUserTickets } = useGetUserTickets();
  const { t } = useTranslation();

  if (isGettingUserTickets) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            {t("book.myBookings.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("book.myBookings.subtitle")}
          </p>
        </motion.div>

        {tickets.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">
                {t("book.myBookings.noBookings")}
              </p>
              <Button asChild>
                <a href="/booking">{t("book.myBookings.bookNow")}</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BookingCard booking={ticket} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
