import DashboardOverview from "@/components/dashboard/dashboard-overview";
import { generateMetadata as getMetadata } from "@/config/meta";
import { getDashboardData } from "@/lib/get-dashboard-data";

export const metadata = getMetadata("/dashboard");

export default async function Dashboard() {
  const dashboardData = await getDashboardData();

  return <DashboardOverview data={dashboardData} />;
}
