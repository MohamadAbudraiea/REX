import { axiosInstance } from "./axios";

export async function getTicketsForDetailer(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const res = await axiosInstance.get(
    `/detailer/tickets/filters?${queryString}`
  );
  return res.data;
}
