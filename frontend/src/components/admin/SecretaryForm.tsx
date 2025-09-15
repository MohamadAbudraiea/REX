import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { AddUser } from "@/shared/types";
import { useAddUser } from "@/hooks/useAdmin";

export function SecretaryForm() {
  const { addUserMutation, isAddingUser } = useAddUser();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSecretary: AddUser = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      type: "secretary",
    };
    addUserMutation(newSecretary);
    setForm({ name: "", email: "", phone: "", password: "" });
  };

  if (isAddingUser)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 mb-4 md:items-end md:flex-row flex-col items-start w-full"
      >
        <div className="flex-1 min-w-0">
          <Label>Name</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="border-primary w-full"
            autoComplete="name"
          />
        </div>
        <div className="flex-1 min-w-0">
          <Label>Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="border-primary w-full"
            autoComplete="email"
          />
        </div>
        <div className="flex-1 min-w-0">
          <Label>Password</Label>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="border-primary w-full"
            autoComplete="new-password webauthn"
          />
        </div>
        <div className="flex-1 min-w-0">
          <Label>Phone</Label>
          <Input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
            className="border-primary w-full"
            autoComplete="tel"
          />
        </div>
        <Button type="submit" className="flex-shrink-0">
          Add Secretary
        </Button>
      </form>
    </div>
  );
}
