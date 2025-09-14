import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Ticket } from "@/shared/types";
import { Separator } from "@/components/ui/separator";

export function BookingsChart({ bookings }: { bookings: Ticket[] }) {
  // Count by status
  const statusCount = bookings.reduce((acc: Record<string, number>, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.keys(statusCount).map((status) => ({
    name: status,
    value: statusCount[status],
  }));

  // Count by service
  const serviceCount = bookings.reduce((acc: Record<string, number>, b) => {
    acc[b.service] = (acc[b.service] || 0) + 1;
    return acc;
  }, {});

  const serviceData = Object.keys(serviceCount).map((service) => ({
    name: service,
    value: serviceCount[service],
  }));

  // Map status to your theme colors
  const statusColors: Record<string, string> = {
    pending: "#3b82f6", // blue
    finished: "#22c55e", // green
    cancelled: "#ef4444", // red
    requested: "#facc15", // yellow
  };

  // Dynamic service colors based on your theme variables
  const serviceThemeColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  const serviceColors = serviceData.map(
    (_, index) => serviceThemeColors[index % serviceThemeColors.length]
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 md:h-96 h-200">
      {/* Status Chart */}
      <div className="flex-1 mb-4 md:mb-0">
        <h3 className="text-center font-semibold mb-2">Bookings by Status</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label
            >
              {statusData.map((entry) => (
                <Cell key={entry.name} fill={statusColors[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Separator for small screens */}
      <Separator className="md:hidden my-4 bg-primary" />

      {/* Service Chart */}
      <div className="flex-1">
        <h3 className="text-center font-semibold mb-2">Bookings by Service</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={serviceData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label
            >
              {serviceData.map((_, index) => (
                <Cell key={index} fill={serviceColors[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value: string) => value}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
