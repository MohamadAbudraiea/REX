import { axiosInstance } from "./axios";

export async function getTicketsForDetailer(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const res = await axiosInstance.get(
    `/detailer/tickets/filters?${queryString}`
  );
  return res.data;
}

export async function finishTicket({ id }: { id: string }) {
  const res = await axiosInstance.post(`/detailer/ticket/finish/${id}`);
  return res.data;
}
