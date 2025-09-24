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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookingStore } from "@/stores/useBookingStore";
import { months, serviceThemeColors, statusColors } from "@/shared/utils";
import { useTheme } from "@/context/theme-provider";
import { useGetChartsData } from "@/hooks/useTicket";

interface LineData {
  day: number;
  bookings: number;
}

interface PieData {
  name: string;
  value: number;
}

interface ChartsData {
  lineData: LineData[];
  statusData: PieData[];
  serviceData: PieData[];
}

export function BookingsChart() {
  const {
    filterMonth,
    filterYear = String(new Date().getFullYear()),
    setFilterMonth,
    setFilterYear,
  } = useBookingStore();

  const { chartsData, isFetchingTickets } = useGetChartsData(
    filterMonth ? Number(filterMonth) : undefined,
    filterYear ? Number(filterYear) : undefined
  );

  const {
    lineData = [],
    statusData = [],
    serviceData = [],
  } = (chartsData as ChartsData) || {};

  const { theme } = useTheme();
  const now = new Date();
  const selectedMonth = filterMonth ? Number(filterMonth) - 1 : now.getMonth();

  if (isFetchingTickets) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!chartsData) {
    return (
      <div className="flex justify-center items-center p-8">
        <p>No bookings found.</p>
      </div>
    );
  }

  const totalBookings = lineData.reduce((sum, d) => sum + d.bookings, 0);
  const nonZeroLineData = lineData.filter((d) => d.bookings > 0);

  const peakDay = nonZeroLineData.length
    ? nonZeroLineData.reduce(
        (max, d) => (d.bookings > max.bookings ? d : max),
        nonZeroLineData[0]
      ).day
    : null;

  const serviceColors = serviceData.map(
    (_, i) => serviceThemeColors[i % serviceThemeColors.length]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart */}
      <Card className="shadow-md rounded-2xl lg:col-span-3">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-lg font-bold">Bookings per Day</CardTitle>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Select
              value={filterMonth ?? String(now.getMonth() + 1).padStart(2, "0")}
              onValueChange={(val) => {
                setFilterMonth(val === "all" ? null : val);
                setFilterYear(filterYear ?? String(now.getFullYear()));
              }}
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
              <ReferenceLine y={0} stroke="#9ca3af" />
              <XAxis dataKey="day" tickLine={false} />
              <YAxis allowDecimals={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1f2937" : "#9ca3af",
                  color: theme === "dark" ? "#9ca3af" : "#1f2937",
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

      {/* Status Pie Chart */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Bookings by Status
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
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
          ) : (
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-lg font-semibold">
                No tickets found for this month.
              </p>
              <span className="ml-2 text-sm text-muted-foreground">
                Try changing the month or year.
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Service Pie Chart */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Bookings by Service
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          {serviceData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
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
          ) : (
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-lg font-semibold">
                No tickets found for this month.
              </p>
              <span className="ml-2 text-sm text-muted-foreground">
                Try changing the month or year.
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
