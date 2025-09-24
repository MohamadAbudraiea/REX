import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Calendar, Clock, DollarSign, Star, MapPin, User } from "lucide-react";
import type { Booking } from "@/shared/types";
import StatusBadge from "./StatusBadge";
import CancelDialog from "./CancelDialog";
import RatingDialog from "./RatingDialog";
import { formatTime, getServiceName } from "@/shared/utils";
import { formatDate } from "date-fns";

interface BookingCardProps {
  booking: Booking;
  onCancel: (booking: Booking, reason: string) => void;
  onRate: (booking: Booking, rating: number, comment: string) => void;
}

export default function BookingCard({
  booking,
  onCancel,
  onRate,
}: BookingCardProps) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return Array.from({ length: 5 }, (_, i) => {
      if (i < fullStars) {
        return (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        return (
          <div key={i} className="relative h-4 w-4">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        return <Star key={i} className="h-4 w-4 text-gray-300" />;
      }
    });
  };

  const existingRating = booking.ratings;

  return (
    <Card className="bg-muted">
      <CardHeader className="pb-4 relative">
        <div className="flex justify-between items-start">
          <div className="space-y-1.5">
            <CardTitle className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
              {getServiceName(booking.service)}
            </CardTitle>
            <CardDescription className="text-muted-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Booked {formatDate(new Date(booking.created_at), "MMM dd, yyyy")}
            </CardDescription>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        {/* Subtle gradient line */}
        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Service Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {booking.date && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30 border border-border/50">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Service Date</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(new Date(booking.date), "EEEE, MMM dd, yyyy")}
                </p>
              </div>
            </div>
          )}

          {booking.start_time && booking.end_time && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30 border border-border/50">
              <div className="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-info" />
              </div>
              <div>
                <p className="text-sm font-medium">Time Slot</p>
                <p className="text-sm text-muted-foreground">
                  {formatTime(booking.start_time)} -{" "}
                  {formatTime(booking.end_time)}
                </p>
              </div>
            </div>
          )}

          {booking.price && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30 border border-border/50">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-700 " />
              </div>
              <div>
                <p className="text-sm font-medium">Total Cost</p>
                <p className="text-sm font-semibold text-success">
                  {parseInt(booking.price).toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {booking.detailer?.name && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30 border border-border/50">
              <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center">
                <User className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Detailer</p>
                <p className="text-sm text-muted-foreground">
                  {booking.detailer.name}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Location */}
        {booking.location && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30 border border-border/50">
            <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <a
              href={booking.location}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              View Location on Maps
            </a>
          </div>
        )}

        {/* Cancel Reason */}
        {booking.cancel_reason && (
          <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
            <p className="text-sm">
              <span className="font-medium text-destructive">
                Cancellation Reason:
              </span>
              <span className="ml-2 text-muted-foreground">
                {booking.cancel_reason}
              </span>
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="py-4 bg-background/30 rounded-lg">
        {/* Existing Rating */}
        {booking.status === "finished" && existingRating![0] && (
          <div className="w-full flex flex-col items-start gap-3">
            <p className="text-sm font-medium">Your Review:</p>
            <div className="flex justify-center items-center gap-2">
              {renderStars(existingRating![0].rating_number)}
              <p className="text-sm text-muted-foreground ">
                {existingRating![0].description}
              </p>
            </div>
          </div>
        )}
        <div className="flex gap-3 w-full">
          {(booking.status === "requested" || booking.status === "pending") && (
            <CancelDialog booking={booking} onCancel={onCancel} />
          )}
          {booking.status === "finished" && !existingRating![0] && (
            <RatingDialog booking={booking} onRate={onRate} />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
