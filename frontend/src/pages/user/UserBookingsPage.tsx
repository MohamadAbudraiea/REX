import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, X, Star, CheckCircle, Clock4 } from "lucide-react";
import { useTranslation } from "react-i18next";

// Mock data types based on your database schema
type ServiceType = "wash" | "dryclean" | "polish" | "nano" | "graphene";
type StatusType = "requested" | "pending" | "finished" | "canceled";

interface Ticket {
  id: number;
  created_at: string;
  user_id: string;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
  price: number | null;
  service: ServiceType;
  status: StatusType;
  secretary_id: string | null;
  detailer_id: string | null;
  cancel_reason: string | null;
}

interface Rating {
  id: string;
  created_at: string;
  user_id: string;
  ticket_id: number;
  description: string;
  rating_number: number;
}

export default function UserBookingsPage() {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<Ticket[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Ticket | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/bookings?user_id=${user.id}`);
        // const data = await response.json();

        // Mock data for demonstration
        const mockBookings: Ticket[] = [
          {
            id: 1,
            created_at: new Date().toISOString(),
            user_id: "123",
            date: "2023-12-15",
            start_time: "10:00:00",
            end_time: "11:30:00",
            price: 49.99,
            service: "wash",
            status: "finished",
            secretary_id: "secretary-1",
            detailer_id: "detailer-1",
            cancel_reason: null,
          },
          {
            id: 2,
            created_at: new Date().toISOString(),
            user_id: "1234",
            date: "2023-12-20",
            start_time: "14:00:00",
            end_time: "15:00:00",
            price: 29.99,
            service: "dryclean",
            status: "pending",
            secretary_id: "secretary-1",
            detailer_id: null,
            cancel_reason: null,
          },
          {
            id: 3,
            created_at: new Date().toISOString(),
            user_id: "12345",
            date: null,
            start_time: null,
            end_time: null,
            price: null,
            service: "polish",
            status: "requested",
            secretary_id: null,
            detailer_id: null,
            cancel_reason: null,
          },
        ];

        setBookings(mockBookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusBadge = (status: StatusType) => {
    const statusConfig = {
      requested: {
        variant: "secondary",
        icon: Clock4,
        text: t("book.status.requested"),
      },
      pending: {
        variant: "default",
        icon: Clock,
        text: t("book.status.pending"),
      },
      finished: {
        variant: "success",
        icon: CheckCircle,
        text: t("book.status.finished"),
      },
      canceled: {
        variant: "destructive",
        icon: X,
        text: t("book.status.canceled"),
      },
    };

    const { variant, icon: Icon, text } = statusConfig[status];
    return (
      <Badge
        variant={
          variant as
            | "secondary"
            | "default"
            | "destructive"
            | "outline"
            | null
            | undefined
        }
        className="flex items-center gap-1"
      >
        <Icon className="w-3 h-3" />
        {text}
      </Badge>
    );
  };

  const getServiceName = (service: ServiceType) => {
    const serviceNames = {
      wash: t("book.form.service.wash"),
      dryclean: t("book.form.service.dryclean"),
      polish: t("book.form.service.polish"),
      nano: t("book.form.service.nano"),
      graphene: t("book.form.service.graphene"),
    };
    return serviceNames[service];
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking || !cancelReason) return;

    try {
      // In a real app, you would make an API call
      // await fetch(`/api/bookings/${selectedBooking.id}/cancel`, {
      //   method: "POST",
      //   body: JSON.stringify({ cancel_reason: cancelReason }),
      // });

      // Update local state
      setBookings(
        bookings.map((booking) =>
          booking.id === selectedBooking.id
            ? { ...booking, status: "canceled", cancel_reason: cancelReason }
            : booking
        )
      );

      setCancelDialogOpen(false);
      setSelectedBooking(null);
      setCancelReason("");
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const handleSubmitRating = async () => {
    if (!selectedBooking || ratingValue === 0) return;

    try {
      // In a real app, you would make an API call
      // await fetch("/api/ratings", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     ticket_id: selectedBooking.id,
      //     rating_number: ratingValue,
      //     description: ratingComment,
      //   }),
      // });

      // Update local state
      const newRating: Rating = {
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        user_id: "123",
        ticket_id: selectedBooking.id,
        rating_number: ratingValue,
        description: ratingComment,
      };

      setRatings([...ratings, newRating]);
      setRatingDialogOpen(false);
      setSelectedBooking(null);
      setRatingValue(0);
      setRatingComment("");
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
            {bookings.map((booking) => {
              const existingRating = getRatingForBooking(booking.id);

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">
                            {getServiceName(booking.service)}
                          </CardTitle>
                          <CardDescription>
                            {new Date(booking.created_at).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {booking.date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>
                              {new Date(booking.date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {booking.start_time && booking.end_time && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>
                              {booking.start_time.substring(0, 5)} -{" "}
                              {booking.end_time.substring(0, 5)}
                            </span>
                          </div>
                        )}
                        {booking.price && (
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              ${booking.price.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>
                      {booking.cancel_reason && (
                        <div className="mt-3 p-3 bg-muted rounded-md">
                          <p className="text-sm text-muted-foreground">
                            <strong>{t("book.cancelReason")}:</strong>{" "}
                            {booking.cancel_reason}
                          </p>
                        </div>
                      )}
                      {existingRating && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < existingRating.rating_number
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {existingRating.description}
                          </span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      {(booking.status === "requested" ||
                        booking.status === "pending") && (
                        <Dialog
                          open={
                            cancelDialogOpen &&
                            selectedBooking?.id === booking.id
                          }
                          onOpenChange={(
                            open: boolean | ((prevState: boolean) => boolean)
                          ) => {
                            setCancelDialogOpen(open);
                            if (open) setSelectedBooking(booking);
                            else setSelectedBooking(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <X className="w-4 h-4 mr-1" />
                              {t("book.cancel")}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{t("book.cancelTitle")}</DialogTitle>
                              <DialogDescription>
                                {t("book.cancelDescription")}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="cancelReason">
                                  {t("book.cancelReason")}
                                </Label>
                                <Textarea
                                  id="cancelReason"
                                  placeholder={t(
                                    "book.cancelReasonPlaceholder"
                                  )}
                                  value={cancelReason}
                                  onChange={(e) =>
                                    setCancelReason(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setCancelDialogOpen(false)}
                              >
                                {t("book.cancelNo")}
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={handleCancelBooking}
                                disabled={!cancelReason}
                              >
                                {t("book.cancelYes")}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      {booking.status === "finished" && !existingRating && (
                        <Dialog
                          open={
                            ratingDialogOpen &&
                            selectedBooking?.id === booking.id
                          }
                          onOpenChange={(
                            open: boolean | ((prevState: boolean) => boolean)
                          ) => {
                            setRatingDialogOpen(open);
                            if (open) setSelectedBooking(booking);
                            else setSelectedBooking(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Star className="w-4 h-4 mr-1" />
                              {t("book.rate")}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{t("book.rateTitle")}</DialogTitle>
                              <DialogDescription>
                                {t("book.rateDescription")}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>{t("book.rating")}</Label>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-8 h-8 cursor-pointer ${
                                        star <= ratingValue
                                          ? "text-yellow-400 fill-yellow-400"
                                          : "text-muted-foreground"
                                      }`}
                                      onClick={() => setRatingValue(star)}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="ratingComment">
                                  {t("book.comment")}
                                </Label>
                                <Textarea
                                  id="ratingComment"
                                  placeholder={t("book.commentPlaceholder")}
                                  value={ratingComment}
                                  onChange={(e) =>
                                    setRatingComment(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setRatingDialogOpen(false)}
                              >
                                {t("book.cancel")}
                              </Button>
                              <Button
                                onClick={handleSubmitRating}
                                disabled={ratingValue === 0}
                              >
                                {t("book.submitRating")}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancel Booking Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("book.cancelTitle")}</DialogTitle>
            <DialogDescription>{t("book.cancelDescription")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cancelReason">{t("book.cancelReason")}</Label>
              <Textarea
                id="cancelReason"
                placeholder={t("book.cancelReasonPlaceholder")}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
            >
              {t("book.cancelNo")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelBooking}
              disabled={!cancelReason}
            >
              {t("book.cancelYes")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
