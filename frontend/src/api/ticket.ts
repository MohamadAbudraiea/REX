import { axiosInstance } from "@/api/axios";

export async function getAllTickets() {
  const res = await axiosInstance.get("/admin/ticket");
  return res.data;
}
