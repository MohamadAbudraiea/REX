import { axiosInstance } from "@/api/axios";

export async function getUsers() {
  const res = await axiosInstance.get("/admin/user");
  return res.data;
}

export async function addUser({
  name,
  email,
  phone,
  password,
  type,
}: {
  name: string;
  email: string;
  phone: string;
  password: string;
  type: string;
}) {
  const res = await axiosInstance.post("/admin/user", {
    name,
    email,
    phone,
    password,
    type,
  });
  return res.data;
}

export async function deleteUser({ id }: { id: string }) {
  const res = await axiosInstance.delete("/admin/user", { data: { id } });
  return res.data;
}

export async function editUser({
  id,
  name,
  email,
  phone,
}: {
  id: string;
  name: string;
  email: string;
  phone: string;
}) {
  const res = await axiosInstance.put("/admin/user", {
    id,
    name,
    email,
    phone,
  });
  return res.data;
}
