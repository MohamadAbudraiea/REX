import { axiosInstance } from "@/api/axios";

export async function getUserTickets() {
  const res = await axiosInstance.get("/user/ticket/all");
  return res.data;
}

export async function addTicket({
  date,
  service,
  location,
  note,
}: {
  date: Date | undefined;
  service: string;
  location: string;
  note: string | undefined;
}) {
  const res = await axiosInstance.post("/user/ticket", {
    date,
    service,
    location,
    note,
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
  const res = await axiosInstance.post(`/user/ticket/cancel/${id}`, {
    cancel_reason: reason,
  });
  return res.data;
}

export async function rateTicket({
  ticket_id,
  rating_number,
  description,
}: {
  ticket_id: string;
  rating_number: number;
  description: string;
}) {
  const res = await axiosInstance.post("/user/ticket/rating", {
    ticket_id,
    rating_number,
    description,
  });
  return res.data;
}
