import WelcomeInterface from "@/features/welcome/WelcomeInterface";

/**
 * WelcomePage
 * -----------
 * Page wrapper for WelcomeInterface.
 *
 * Responsibilities:
 * - Render the landing/welcome component for unauthenticated users.
 * - Acts as a page-level component for routing purposes.
 */

const WelcomePage = () => {
  return <WelcomeInterface />;
};

export default WelcomePage;
