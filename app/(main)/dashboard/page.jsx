import { getOnboardedUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const IndustryInsights = async () => {
  const { isOnboraded } = await getOnboardedUser();
  if (!isOnboraded) {
    redirect("/onboarding "); // redirect to dashboard if user is already onboaded
  }
  return <div>IndustryInsights</div>;
};

export default IndustryInsights;
