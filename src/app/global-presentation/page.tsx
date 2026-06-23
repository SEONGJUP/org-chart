import HowItWorks from "../_components/HowItWorks";
import GlobalExpansion from "../_components/GlobalExpansion";
import ExpansionPlan from "../_components/ExpansionPlan";
import ClientBenefits from "../_components/ClientBenefits";
import FinancialPlan from "../_components/FinancialPlan";
import RevenueRoadmap from "../_components/RevenueRoadmap";

export default function GlobalPresentationPage() {
  return (
    <div className="w-screen overflow-x-hidden">
      <HowItWorks />
      <GlobalExpansion />
      <ExpansionPlan />
      <ClientBenefits />
      <RevenueRoadmap />
      <FinancialPlan />
    </div>
  );
}
