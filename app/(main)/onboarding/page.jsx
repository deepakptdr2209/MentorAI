import { industries } from "@/data/industries";
import OnboardingForm from "./_component/onboarding-form.jsx";
import { getOnboardedUser } from "@/actions/user.js";
import { redirect } from "next/navigation";
const OnboardingPage = async () => {
  const { isOnboraded } = await getOnboardedUser();
  if (isOnboraded) {
    redirect("/dashboard"); // redirect to dashboard if user is already onboaded
  }
  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnboardingPage;
