import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, StarHalf } from "lucide-react";
import type { Ticket } from "@/shared/types";
import { useTranslation } from "react-i18next";

interface RatingDialogProps {
  booking: Ticket;
  onRate: (booking: Ticket, rating: number, comment: string) => void;
}

export default function RatingDialog({ booking, onRate }: RatingDialogProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  const handleSubmit = () => {
    onRate(booking, ratingValue, ratingComment);
    setIsOpen(false);
    setRatingValue(0);
    setRatingComment("");
  };

  const handleStarInteraction = (value: number, isHalf: boolean = false) => {
    const finalValue = isHalf ? value - 0.5 : value;
    setRatingValue(finalValue);
  };

  const handleStarHover = (value: number, isHalf: boolean = false) => {
    const finalValue = isHalf ? value - 0.5 : value;
    setHoverValue(finalValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const renderStar = (star: number) => {
    const displayValue = hoverValue || ratingValue;
    const isHalfFilled = displayValue >= star - 0.5 && displayValue < star;
    const isFilled = displayValue >= star;

    return (
      <div key={star} className="relative w-8 h-8 mx-0.5">
        {/* Left half (for half-star selection) */}
        <div
          className="absolute left-0 top-0 w-1/2 h-full cursor-pointer z-10"
          onClick={() => handleStarInteraction(star, true)}
          onMouseEnter={() => handleStarHover(star, true)}
        />

        {/* Right half (for full-star selection) */}
        <div
          className="absolute right-0 top-0 w-1/2 h-full cursor-pointer z-10"
          onClick={() => handleStarInteraction(star)}
          onMouseEnter={() => handleStarHover(star)}
        />

        {/* Star display */}
        {isHalfFilled ? (
          <div className="relative">
            <Star className="w-8 h-8 text-muted-foreground" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarHalf className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        ) : (
          <Star
            className={`w-8 h-8 transition-colors ${
              isFilled
                ? "text-yellow-400 fill-yellow-400"
                : "text-muted-foreground"
            }`}
          />
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Star className="w-4 h-4 mr-1" />
          {t("book.rate.button")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("book.rate.title")}</DialogTitle>
          <DialogDescription>{t("book.rate.description")}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>{t("book.rate.rating")}</Label>
            <div className="flex items-center" onMouseLeave={handleMouseLeave}>
              {[1, 2, 3, 4, 5].map(renderStar)}
              <span className="ml-2 text-sm text-muted-foreground">
                {ratingValue.toFixed(1)} / 5.0
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ratingComment">{t("book.rate.comment")}</Label>
            <Textarea
              id="ratingComment"
              placeholder={t("book.rate.comment_placeholder")}
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t("book.rate.cancel")}
          </Button>
          <Button onClick={handleSubmit} disabled={ratingValue === 0}>
            {t("book.rate.submit")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
