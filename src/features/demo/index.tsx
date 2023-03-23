import { Designer } from "~/features/designer";
import { Layout, TabNav } from "~/features/dashboard";

export function DemoPage() {
  return (
    <Layout>
      <TabNav />
      <Designer />
    </Layout>
  );
}
