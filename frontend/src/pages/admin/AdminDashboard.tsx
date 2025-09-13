/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/admin/DataTable";
import { SecretaryForm } from "@/components/admin/SecretaryForm";
import { DeliveryForm } from "@/components/admin/DeliveryForm";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { BookingsChart } from "@/components/admin/BookingsChart";

export default function AdminDashboard() {
  // ✅ Mock secretaries
  const [secretaries, setSecretaries] = useState<any[]>([
    {
      id: "s1",
      name: "Alice Johnson",
      email: "alice@blink.com",
      phone: "0790000000",
    },
    {
      id: "s2",
      name: "Bob Smith",
      email: "bob@blink.com",
      phone: "0791111111",
    },
  ]);

  // ✅ Mock deliveries
  const [deliveries, setDeliveries] = useState<any[]>([
    {
      id: "d1",
      name: "Charlie Brown",
      email: "charlie@blink.com",
      phone: "0791111111",
    },
    {
      id: "d2",
      name: "David Wilson",
      email: "david@blink.com",
      phone: "0792222222",
    },
  ]);

  // ✅ More detailed bookings
  const [bookings] = useState<any[]>([
    {
      id: "b1",
      user_id: "user1",
      service: "Car Wash",
      status: "Pending",
      price: 15,
      date: "2025-09-01",
      secretary_id: "Alice Johnson",
      detailer_id: "Charlie Brown",
      rating: null,
      cancel_reason: null,
    },
    {
      id: "b2",
      user_id: "user2",
      service: "Dry Cleaning",
      status: "Completed",
      price: 50,
      date: "2025-09-05",
      secretary_id: "Bob Smith",
      detailer_id: "David Wilson",
      rating: 5,
      cancel_reason: null,
    },
    {
      id: "b3",
      user_id: "user3",
      service: "polish",
      status: "Cancelled",
      price: 20,
      date: "2025-09-07",
      secretary_id: "Alice Johnson",
      detailer_id: "Charlie Brown",
      rating: null,
      cancel_reason: "High price",
    },
    {
      id: "b4",
      user_id: "user4",
      service: "nano ceramic",
      status: "Completed",
      price: 30,
      date: "2025-09-10",
      secretary_id: "Bob Smith",
      detailer_id: "David Wilson",
      rating: 4,
      cancel_reason: null,
    },
    {
      id: "b5",
      user_id: "user5",
      service: "Car Wash",
      status: "Requested",
      price: 15,
      date: "2025-09-12",
      secretary_id: null,
      detailer_id: null,
      rating: null,
      cancel_reason: null,
    },
    {
      id: "b6",
      user_id: "user6",
      service: "Graphene",
      status: "Pending",
      price: 50,
      date: "2025-09-15",
      secretary_id: "Alice Johnson",
      detailer_id: "Charlie Brown",
      rating: 5,
      cancel_reason: null,
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">BLINK Admin Dashboard</h1>

      <Tabs defaultValue="secretary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="secretary">Secretaries</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
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
              <SecretaryForm setSecretaries={setSecretaries} />
              <DataTable
                data={secretaries}
                columns={[
                  //   { key: "id", label: "ID" },
                  { key: "name", label: "Name" },
                  { key: "email", label: "Email" },
                  { key: "phone", label: "Phone" },
                ]}
                onDelete={(id: string) =>
                  setSecretaries(secretaries.filter((s) => s.id !== id))
                }
                onEdit={(updated: any) =>
                  setSecretaries(
                    secretaries.map((s) => (s.id === updated.id ? updated : s))
                  )
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Delivery CRUD */}
        <TabsContent value="delivery">
          <Card>
            <CardHeader>
              <CardTitle>Manage Delivery Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <DeliveryForm setDeliveries={setDeliveries} />
              <DataTable
                data={deliveries}
                columns={[
                  //   { key: "id", label: "ID" },
                  { key: "name", label: "Name" },
                  { key: "email", label: "Email" },
                  { key: "phone", label: "Phone" },
                ]}
                onDelete={(id: any) =>
                  setDeliveries(deliveries.filter((d) => d.id !== id))
                }
                onEdit={(updated: any) =>
                  setDeliveries(
                    deliveries.map((d) => (d.id === updated.id ? updated : d))
                  )
                }
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
              <BookingsTable bookings={bookings} />
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
