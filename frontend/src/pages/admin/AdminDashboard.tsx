import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/admin/DataTable";
import { SecretaryForm } from "@/components/admin/SecretaryForm";
import { DetailerForm } from "@/components/admin/DetailerForm";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { BookingsChart } from "@/components/admin/BookingsChart";
import type { Ticket } from "@/shared/types";
import { useGetUsers } from "@/hooks/useAdmin";

export default function AdminDashboard() {
  const { users, isGettingUsers } = useGetUsers();

  // ✅ Mock bookings with correct types
  const [bookings] = useState<Ticket[]>([
    {
      id: "b1",
      user: {
        id: "u1",
        name: "User One",
        email: "user1@example.com",
        phone: "0791111111",
      },
      service: "wash",
      status: "pending",
      phone: "0791111111",
      price: 15,
      date: "2025-09-01",
      secretary_id: "s1",
      detailer_id: "d1",
      rating: null,
      cancel_reason: null,
      created_at: "",
      start_time: null,
      end_time: null,
    },
    {
      id: "b2",
      user: {
        id: "u2",
        name: "User Two",
        email: "user2@example.com",
        phone: "0792222222",
      },
      service: "dryclean",
      status: "finished",
      phone: "0792222222",
      price: 50,
      date: "2025-09-05",
      secretary_id: "s2",
      detailer_id: "d2",
      rating: {
        id: "r1",
        ticket_id: "b2",
        rating_number: 4.5,
        description: "Great service!",
        created_at: "",
        user_id: "u2",
      },
      cancel_reason: null,
      created_at: "",
      start_time: null,
      end_time: null,
    },
    {
      id: "b3",
      user: {
        id: "u3",
        name: "User Three",
        email: "user3@example.com",
        phone: "0793333333",
      },
      service: "polish",
      status: "cancelled", // ✅ fixed spelling
      phone: "0793333333",
      price: 20,
      date: "2025-09-07",
      secretary_id: "s1",
      detailer_id: "d1",
      rating: null,
      cancel_reason: "High price",
      created_at: "",
      start_time: null,
      end_time: null,
    },
    {
      id: "b4",
      user: {
        id: "u4",
        name: "User Four",
        email: "user4@example.com",
        phone: "0794444444",
      },
      service: "nano",
      status: "finished",
      phone: "0794444444",
      price: 30,
      date: "2025-09-10",
      secretary_id: "s2",
      detailer_id: "d2",
      rating: {
        id: "r2",
        ticket_id: "b4",
        rating_number: 4,
        description: "Good service",
        created_at: "",
        user_id: "u4",
      },
      cancel_reason: null,
      created_at: "",
      start_time: null,
      end_time: null,
    },
    {
      id: "b5",
      user: {
        id: "u5",
        name: "User Five",
        email: "user5@example.com",
        phone: "0795555555",
      },
      service: "wash",
      status: "requested",
      phone: "0795555555",
      price: null,
      date: "2025-09-12",
      secretary_id: null,
      detailer_id: null,
      rating: null,
      cancel_reason: null,
      created_at: "",
      start_time: null,
      end_time: null,
    },
    {
      id: "b6",
      user: {
        id: "u6",
        name: "User Six",
        email: "user6@example.com",
        phone: "0796666666",
      },
      service: "graphene",
      status: "pending",
      phone: "0796666666",
      price: 50,
      date: "2025-09-15",
      secretary_id: "s1",
      detailer_id: "d1",
      rating: {
        id: "r3",
        ticket_id: "b6",
        rating_number: 5,
        description: "Excellent",
        created_at: "",
        user_id: "u6",
      },
      cancel_reason: null,
      created_at: "",
      start_time: null,
      end_time: null,
    },
  ]);

  if (isGettingUsers) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">BLINK Admin Dashboard</h1>

      <Tabs defaultValue="secretary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="secretary">Secretaries</TabsTrigger>
          <TabsTrigger value="detailer">Detailer</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        {/* Secretary CRUD */}
        <TabsContent value="secretary">
          <Card>
            <CardHeader>
              <CardTitle>Manage Secretaries</CardTitle>
            </CardHeader>
            <CardContent>
              <SecretaryForm />
              <DataTable
                data={users.secretaries}
                columns={[
                  { key: "name", label: "Name" },
                  { key: "email", label: "Email" },
                  { key: "phone", label: "Phone" },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Detailer CRUD */}
        <TabsContent value="Detailer">
          <Card>
            <CardHeader>
              <CardTitle>Manage Detailer Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <DetailerForm />
              <DataTable
                data={users.detailers}
                columns={[
                  { key: "name", label: "Name" },
                  { key: "email", label: "Email" },
                  { key: "phone", label: "Phone" },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings list */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingsTable bookings={bookings} detailers={users.detailers} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chart */}
        <TabsContent value="charts">
          <Card>
            <CardHeader>
              <CardTitle>Booking Status Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingsChart bookings={bookings} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
