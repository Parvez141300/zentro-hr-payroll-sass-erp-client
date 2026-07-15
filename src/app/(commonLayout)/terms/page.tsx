
import { Metadata } from "next";
import Terms from "@/components/modules/common/terms/Terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Zentro HR & Payroll platform",
};

export default function TermsPage() {
  return (
    <Terms />
  );
}
