import { axiosInstance } from "@/api/axios";

export async function getRatingForTicket({ id }: { id: string }) {
  const res = await axiosInstance.get(`/admin/ticket/rating/${id}`);
  return res.data;
}

export async function getReviewsFoHome() {
  const res = await axiosInstance.get("/shared/ticket/all/ratings");
  return res.data;
}
