import { getRatingForTicket, getReviewsFoHome } from "@/api/rating";
import type { Rating } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export const useGetRatingForTicket = (id: string) => {
  const { data, isPending: isFetchingRating } = useQuery({
    queryKey: ["ticketRating", id],
    queryFn: () => getRatingForTicket({ id }),
  });

  return { rating: data?.data, isFetchingRating };
};

export const useGetReviewsFoHome = (): {
  reviews: Rating[] | undefined;
  isFetchingReviews: boolean;
} => {
  const { data, isPending: isFetchingReviews } = useQuery({
    queryKey: ["reviewsFoHome"],
    queryFn: getReviewsFoHome,
  });

  return { reviews: data?.data, isFetchingReviews };
};
