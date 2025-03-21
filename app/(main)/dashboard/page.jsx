import { getIndustryInsights } from "@/actions/dashboard";
import { getOnboardedUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import DashboardView from "./_component/Dashboard-view";

const IndustryInsights = async () => {
  const { isOnboraded } = await getOnboardedUser();
  const insights = await getIndustryInsights();
  if (!isOnboraded) {
    redirect("/onboarding "); // redirect to dashboard if user is already onboaded
  }
  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
};

export default IndustryInsights;
