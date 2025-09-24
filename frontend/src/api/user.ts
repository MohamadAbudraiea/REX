import { axiosInstance } from "@/api/axios";

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
