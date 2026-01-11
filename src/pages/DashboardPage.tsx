/**
 * DashboardPage
 * -------------
 * Page wrapper for DashboardInterface.
 *
 * Responsibilities:
 * - Render the main dashboard component.
 * - Acts as a page-level component for routing purposes.
 */

import DashboardInterface from "@/features/dashboard/DashboardInterface";

const DashboardPage = () => {
  return <DashboardInterface />;
};

export default DashboardPage;
