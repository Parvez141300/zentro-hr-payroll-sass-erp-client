// src/app/(public)/terms/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  FileText,
  Clock,
  Users,
  Database,
  Lock,
  AlertTriangle,
  CheckCircle,
  FileCheck,
  Building2,
  Scale,
  Gavel,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Zentro HR & Payroll platform",
};

// Navigation items data
const NAVIGATION_ITEMS = [
  { label: "Acceptance", icon: FileCheck },
  { label: "Definitions", icon: FileText },
  { label: "User Accounts", icon: Users },
  { label: "Data Privacy", icon: Shield },
  { label: "Security", icon: Lock },
  { label: "Payments", icon: Building2 },
  { label: "Termination", icon: Gavel },
  { label: "Liability", icon: AlertTriangle },
] as const;

// Definitions data
const DEFINITIONS = [
  {
    term: "Platform",
    definition:
      "The Zentro HR & Payroll software application and associated services.",
  },
  {
    term: "Organization",
    definition:
      "The company, business, or entity that has registered for the Service.",
  },
  {
    term: "User",
    definition:
      "Any individual who accesses or uses the Platform on behalf of an Organization.",
  },
  {
    term: "Personal Data",
    definition:
      "Any information that relates to an identified or identifiable individual.",
  },
  {
    term: "Payroll Data",
    definition:
      "Employee compensation, tax, and financial information processed through the Platform.",
  },
] as const;

// User account items data
const USER_ACCOUNT_ITEMS = [
  {
    title: "Account Creation",
    description:
      "Users must provide accurate and complete information during registration.",
  },
  {
    title: "Account Security",
    description:
      "Users are responsible for maintaining the confidentiality of their credentials.",
  },
  {
    title: "Organization Ownership",
    description:
      "Organizations retain ownership of their data and can manage user access.",
  },
  {
    title: "Role-Based Access",
    description:
      "Access is determined by assigned roles (Super Admin, Admin, HR, Manager, Employee).",
  },
] as const;

// Termination items data
const TERMINATION_ITEMS = [
  "Organizations may cancel their subscription at any time.",
  "Zentro reserves the right to suspend or terminate accounts that violate these terms.",
  "Upon termination, data can be exported within 30 days before permanent deletion.",
] as const;

export default function TermsPage() {
  return (
    <div className="container py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Scale className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Terms of Service
        </h1>
        <p className="text-muted-foreground text-lg">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <Badge variant="secondary" className="mt-3">
          <Clock className="h-3 w-3 mr-1" />
          Version 2.0
        </Badge>
      </div>

      {/* Quick Navigation */}
      <Card className="mb-8 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Quick Navigation</CardTitle>
          <CardDescription>Jump to any section of our terms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase().replace(" ", "-")}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-sm text-foreground transition-colors"
              >
                <item.icon className="h-4 w-4 text-muted-foreground" />
                {item.label}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-8">
        {/* Section 1: Acceptance of Terms */}
        <section id="acceptance-of-terms">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileCheck className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                By accessing or using the Zentro HR & Payroll platform
                (&ldquo;the Service&rdquo;), you agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do
                not use the Service.
              </p>
              <div className="bg-secondary/30 p-4 rounded-lg border border-border/50">
                <p className="text-sm font-medium text-foreground flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                  <span>
                    These terms constitute a legally binding agreement between
                    you and Zentro. By using the Service, you acknowledge that
                    you have read, understood, and agree to be bound by these
                    terms.
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Section 2: Definitions */}
        <section id="definitions">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/50">
                  <FileText className="h-5 w-5 text-foreground" />
                </div>
                <CardTitle>2. Definitions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                {DEFINITIONS.map((item) => (
                  <div
                    key={item.term}
                    className="bg-secondary/20 p-4 rounded-lg"
                  >
                    <dt className="font-semibold text-foreground">
                      {item.term}
                    </dt>
                    <dd className="text-muted-foreground mt-1">
                      {item.definition}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Section 3: User Accounts */}
        <section id="user-accounts">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>3. User Accounts</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {USER_ACCOUNT_ITEMS.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20"
                  >
                    <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Section 4: Data Privacy & Security */}
        <section id="data-privacy">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>4. Data Privacy & Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border/50 bg-secondary/10">
                  <Database className="h-5 w-5 text-primary mb-2" />
                  <h4 className="font-medium text-foreground">
                    Data Protection
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    All data is encrypted in transit and at rest using
                    industry-standard protocols.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border/50 bg-secondary/10">
                  <Lock className="h-5 w-5 text-primary mb-2" />
                  <h4 className="font-medium text-foreground">
                    Access Control
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Role-based access ensures users only see data relevant to
                    their role.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                For detailed information about how we handle your data, please
                refer to our{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Section 5: Payments */}
        <section id="payments">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/50">
                  <Building2 className="h-5 w-5 text-foreground" />
                </div>
                <CardTitle>5. Payments & Billing</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Zentro offers flexible payment options to serve organizations
                globally:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border/50">
                  <Badge variant="default" className="mb-2">
                    International
                  </Badge>
                  <h4 className="font-medium text-foreground">Stripe</h4>
                  <p className="text-sm text-muted-foreground">
                    Secure international payments with support for multiple
                    currencies.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border/50">
                  <Badge variant="default" className="mb-2">
                    Bangladesh
                  </Badge>
                  <h4 className="font-medium text-foreground">SSLCommerz</h4>
                  <p className="text-sm text-muted-foreground">
                    Local payment processing optimized for Bangladeshi
                    businesses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Section 6: Termination */}
        <section id="termination">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <Gavel className="h-5 w-5 text-destructive" />
                </div>
                <CardTitle>6. Termination</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Either party may terminate this agreement under the following
                conditions:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                {TERMINATION_ITEMS.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Section 7: Liability */}
        <section id="liability">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <CardTitle>7. Limitation of Liability</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                <p className="text-sm text-muted-foreground">
                  To the maximum extent permitted by law, Zentro shall not be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, or any loss of profits or revenues,
                  whether incurred directly or indirectly, or any loss of data,
                  use, goodwill, or other intangible losses.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Section 8: Contact */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Questions?</CardTitle>
            <CardDescription>
              If you have any questions about these Terms of Service, please
              contact us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="mailto:legal@zentro.com"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Email Legal Team
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
