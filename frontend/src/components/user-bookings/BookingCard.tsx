import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Calendar, Clock, Star, StarHalf } from "lucide-react";
import type { Ticket, Rating } from "@/shared/types";
import StatusBadge from "./StatusBadge";
import CancelDialog from "./CancelDialog";
import RatingDialog from "./RatingDialog";
import { getServiceName, formatDate, formatTime } from "@/shared/utils";

interface BookingCardProps {
  booking: Ticket;
  existingRating?: Rating;
  onCancel: (booking: Ticket, reason: string) => void;
  onRate: (booking: Ticket, rating: number, comment: string) => void;
}

export default function BookingCard({
  booking,
  existingRating,
  onCancel,
  onRate,
}: BookingCardProps) {
  return (
    <Card className="bg-gradient-to-r from-background via-background to-muted/70 rounded-lg shadow-2xl">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">
              {getServiceName(booking.service)}
            </CardTitle>
            <CardDescription>{formatDate(booking.created_at)}</CardDescription>
          </div>
          <StatusBadge status={booking.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {booking.date && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{formatDate(booking.date)}</span>
            </div>
          )}
          {booking.start_time && booking.end_time && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>
                {formatTime(booking.start_time)} -{" "}
                {formatTime(booking.end_time)}
              </span>
            </div>
          )}
          {booking.price && (
            <div className="flex items-center gap-2">
              <span className="font-semibold">${booking.price.toFixed(2)}</span>
            </div>
          )}
        </div>

        {booking.cancel_reason && (
          <div className="mt-3 p-3 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">
              <strong>Cancel Reason:</strong> {booking.cancel_reason}
            </p>
          </div>
        )}

        {existingRating && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => {
                const rating = existingRating.rating_number;
                const starValue = i + 1;
                const isHalfStar =
                  rating >= starValue - 0.5 && rating < starValue;
                const isFullStar = rating >= starValue;

                if (isHalfStar) {
                  return (
                    <div key={i} className="relative">
                      <Star className="w-4 h-4 text-muted-foreground" />
                      <div className="absolute inset-0 overflow-hidden w-1/2">
                        <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </div>
                    </div>
                  );
                }

                return (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      isFullStar
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                );
              })}
            </div>
            <span className="text-sm text-muted-foreground">
              {existingRating.description}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        {(booking.status === "requested" || booking.status === "pending") && (
          <CancelDialog booking={booking} onCancel={onCancel} />
        )}
        {booking.status === "finished" && !existingRating && (
          <RatingDialog booking={booking} onRate={onRate} />
        )}
      </CardFooter>
    </Card>
  );
}
