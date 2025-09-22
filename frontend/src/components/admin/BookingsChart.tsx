import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import type { Ticket } from "@/shared/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo } from "react";
import { useBookingStore } from "@/stores/useBookingStore";
import {
  getDaysInMonth,
  months,
  serviceThemeColors,
  statusColors,
} from "@/shared/utils";
import { useTheme } from "@/context/theme-provider";

export function BookingsChart({ bookings }: { bookings: Ticket[] }) {
  const { theme } = useTheme();
  const now = new Date();
  const { filterMonth, filterYear, setFilterMonth, setFilterYear } =
    useBookingStore();
  const selectedMonth = filterMonth ? Number(filterMonth) - 1 : now.getMonth();
  const selectedYear = filterYear ? Number(filterYear) : now.getFullYear();

  // Count by Status
  const statusCount = bookings.reduce((acc: Record<string, number>, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.keys(statusCount).map((status) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: statusCount[status],
  }));

  // Count by Service
  const serviceCount = bookings.reduce((acc: Record<string, number>, b) => {
    acc[b.service] = (acc[b.service] || 0) + 1;
    return acc;
  }, {});

  const serviceData = Object.keys(serviceCount).map((service) => ({
    name: service,
    value: serviceCount[service],
  }));

  // Count by Day of Selected Month
  const lineData = useMemo(() => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const dayCount = bookings.reduce((acc: Record<number, number>, b) => {
      if (b.date) {
        const date = new Date(b.date);
        if (
          date.getMonth() === selectedMonth &&
          date.getFullYear() === selectedYear
        ) {
          const day = date.getDate();
          acc[day] = (acc[day] || 0) + 1;
        }
      }
      return acc;
    }, {});

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      return { day, bookings: dayCount[day] || 0 };
    });
  }, [bookings, selectedMonth, selectedYear]);

  // Stats
  const totalBookings = lineData.reduce((sum, d) => sum + d.bookings, 0);
  const peakDay =
    lineData.length > 0
      ? lineData.reduce(
          (max, d) => (d.bookings > max.bookings ? d : max),
          lineData[0]
        ).day
      : null;

  const serviceColors = serviceData.map(
    (_, i) => serviceThemeColors[i % serviceThemeColors.length]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bookings per Day (Line Chart) */}
      <Card className="shadow-md rounded-2xl lg:col-span-3">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-lg font-bold">Bookings per Day</CardTitle>
          <div className="flex gap-2 mt-2 md:mt-0">
            {/* Month Select */}
            <Select
              value={filterMonth ?? String(now.getMonth() + 1).padStart(2, "0")}
              onValueChange={(val) =>
                setFilterMonth(val === "all" ? null : val)
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m, i) => {
                  const val = String(i + 1).padStart(2, "0");
                  return (
                    <SelectItem key={i} value={val}>
                      {m}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            {/* Year Select */}
            <Select
              value={filterYear ?? String(now.getFullYear())}
              onValueChange={(val) => setFilterYear(val === "all" ? null : val)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 5 }, (_, i) => now.getFullYear() - i).map(
                  (year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        {/* Stats summary */}
        <div className="grid grid-cols-2 gap-4 px-6 pb-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-lg font-semibold">{totalBookings}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Peak Day</p>
            <p className="text-lg font-semibold">
              {peakDay ? `${peakDay}/${selectedMonth + 1}` : "-"}
            </p>
          </div>
        </div>

        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              {/* Alternative to CartesianGrid: only Y reference lines */}
              <ReferenceLine y={0} stroke="#9ca3af" />
              <XAxis dataKey="day" tickLine={false} />
              <YAxis allowDecimals={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: `${
                    theme === "dark" ? "#1f2937" : "#9ca3af"
                  }`,
                  color: `${theme === "dark" ? "#9ca3af" : "#1f2937"}`,
                }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#3b82f6" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      {/* Bookings by Status */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Bookings by Status
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {statusData.map((entry) => (
                  <Cell key={entry.name} fill={statusColors[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bookings by Service */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Bookings by Service
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {serviceData.map((_, index) => (
                  <Cell key={index} fill={serviceColors[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
