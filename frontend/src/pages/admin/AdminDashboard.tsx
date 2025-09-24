import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/admin/DataTable";
import { SecretaryForm } from "@/components/admin/SecretaryForm";
import { DetailerForm } from "@/components/admin/DetailerForm";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { BookingsChart } from "@/components/admin/BookingsChart";
import { useGetUsers } from "@/hooks/useAdmin";

export default function AdminDashboard() {
  const { users, isGettingUsers } = useGetUsers();

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
        <TabsContent value="detailer">
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
                showSchedule={true}
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
              <BookingsTable detailers={users.detailers} />
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
              <BookingsChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
