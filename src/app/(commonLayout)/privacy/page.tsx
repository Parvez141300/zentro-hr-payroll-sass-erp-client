
import { Metadata } from "next";
import Privacy from "@/components/modules/common/privacy/Privacy";

export const metadata: Metadata = {
  title: "Privacy Policy - Zentro HR & Payroll",
  description: "Privacy policy for Zentro HR & Payroll platform",
};

export default function PrivacyPage() {
  return (
    <Privacy />
  );
}
