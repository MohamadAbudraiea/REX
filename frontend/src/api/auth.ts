import { axiosInstance } from "@/api/axios";

export async function signUp({
  name,
  email,
  phone,
  password,
}: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const res = await axiosInstance.post("/auth/signup", {
    name,
    email,
    phone,
    password,
  });
  return res.data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await axiosInstance.post("/auth/login", { email, password });
  return res.data;
}

export async function logout() {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
}

export async function checkAuth() {
  const res = await axiosInstance.get("/auth/check");
  return res.data;
}
