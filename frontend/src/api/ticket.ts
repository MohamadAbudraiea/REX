import { axiosInstance } from "@/api/axios";

export async function getAllTickets() {
  const res = await axiosInstance.get("/admin/ticket");
  return res.data;
}

export async function acceptTicket({
  id,
  detailer_id,
  date,
  start_time,
  end_time,
  price,
  location,
}: {
  id: string;
  detailer_id: string;
  date: string;
  start_time: string;
  end_time: string;
  price: number;
  location: string;
}) {
  const res = await axiosInstance.post(`/admin/ticket/accept/${id}`, {
    detailer_id,
    date,
    start_time,
    end_time,
    price,
    location,
  });
  return res.data;
}

export async function cancelTicket({
  id,
  reason,
}: {
  id: string;
  reason: string;
}) {
  const res = await axiosInstance.post(`/admin/ticket/cancel/${id}`, {
    cancel_reason: reason,
  });
  return res.data;
}

export async function finishTicket({ id }: { id: string }) {
  const res = await axiosInstance.post(`/admin/ticket/finish/${id}`);
  return res.data;
}
