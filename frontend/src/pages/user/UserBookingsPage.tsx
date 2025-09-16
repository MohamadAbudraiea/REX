import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import type { Ticket, Rating } from "@/shared/types";
import { MOCK_BOOKINGS } from "@/shared/constants";
import BookingCard from "@/components/user-bookings/BookingCard";

export default function UserBookingsPage() {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<Ticket[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setBookings(MOCK_BOOKINGS);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (booking: Ticket, reason: string) => {
    try {
      setBookings(
        bookings.map((b) =>
          b.id === booking.id
            ? { ...b, status: "canceled", cancel_reason: reason }
            : b
        )
      );
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const handleSubmitRating = async (
    booking: Ticket,
    rating: number,
    comment: string
  ) => {
    try {
      const newRating: Rating = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        user_id: "123",
        ticket_id: booking.id,
        rating_number: rating,
        description: comment,
      };
      setRatings([...ratings, newRating]);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  const getRatingForBooking = (bookingId: number) => {
    return ratings.find((rating) => rating.ticket_id === bookingId);
  };

  if (loading) {
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

        {bookings.length === 0 ? (
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
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BookingCard
                  booking={booking}
                  existingRating={getRatingForBooking(booking.id)}
                  onCancel={handleCancelBooking}
                  onRate={handleSubmitRating}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
