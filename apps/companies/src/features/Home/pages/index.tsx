import { useSetPageMeta } from "@/hooks";

export function Dashboard() {
  useSetPageMeta({
    title: "Dashboard",
  });
  return <div>Hello Dashboard</div>;
}
