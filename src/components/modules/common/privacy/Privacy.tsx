// src/app/(public)/privacy/page.tsx
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
  Eye,
  Database,
  Lock,
  Cookie,
  Mail,
  UserCheck,
  FileText,
  Trash2,
  Globe,
  Server,
  Fingerprint,
  Bell,
  Share2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
} from "lucide-react";
import Link from "next/link";

// Summary cards data
const SUMMARY_CARDS = [
  {
    icon: Lock,
    title: "Data Security",
    description: "Encrypted in transit & at rest",
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    description: "Access, modify, or delete your data",
  },
  {
    icon: Globe,
    title: "Compliance",
    description: "GDPR, CCPA, and local laws",
  },
] as const;

// Data collection sections
const DATA_COLLECTION_SECTIONS = [
  {
    icon: UserCheck,
    title: "Personal Information",
    items: [
      "Full name",
      "Email address",
      "Phone number",
      "Date of birth",
      "Home address",
    ],
  },
  {
    icon: Building2,
    title: "Employment Data",
    items: [
      "Job title",
      "Department",
      "Salary information",
      "Employment history",
      "Performance reviews",
    ],
  },
  {
    icon: Clock,
    title: "Activity Data",
    items: [
      "Attendance records",
      "Leave requests",
      "Timesheets",
      "Login activity",
      "System usage",
    ],
  },
  {
    icon: Cookie,
    title: "Technical Data",
    items: [
      "IP address",
      "Browser type",
      "Device information",
      "Cookies",
      "Usage analytics",
    ],
  },
] as const;

// Data usage items
const DATA_USAGE_ITEMS = [
  {
    icon: Server,
    title: "Core Operations",
    description: "Process payroll, manage attendance, administer benefits",
  },
  {
    icon: Bell,
    title: "Communications",
    description: "Send important updates, notifications, and alerts",
  },
  {
    icon: Share2,
    title: "Reporting",
    description: "Generate analytics, compliance reports, and insights",
  },
  {
    icon: Lock,
    title: "Security",
    description:
      "Monitor for fraud, protect against threats, ensure compliance",
  },
] as const;

// Security features
const SECURITY_FEATURES = [
  "End-to-end encryption",
  "Multi-factor authentication",
  "Role-based access control",
  "Regular security audits",
  "Data backup & recovery",
  "GDPR/CCPA compliance",
  "Secure data centers",
  "24/7 monitoring",
] as const;

// Privacy rights
const PRIVACY_RIGHTS = [
  {
    icon: Eye,
    title: "Right to Access",
    description: "Request a copy of your personal data",
  },
  {
    icon: FileText,
    title: "Right to Rectification",
    description: "Correct inaccurate or incomplete data",
  },
  {
    icon: Trash2,
    title: "Right to Deletion",
    description: "Request deletion of your personal data",
  },
  {
    icon: Database,
    title: "Right to Data Portability",
    description: "Receive your data in a machine-readable format",
  },
] as const;

// Retention policy data
const RETENTION_POLICIES = [
  {
    title: "Active Accounts",
    description: "Data retained for the duration of your account + 30 days",
  },
  {
    title: "Deleted Accounts",
    description: "Data retained for 30 days, then permanently deleted",
  },
  {
    title: "Payroll Records",
    description: "Retained for 7 years (legal requirement)",
  },
  {
    title: "Analytics Data",
    description: "Aggregated data retained indefinitely",
  },
] as const;

// Cookie types
const COOKIE_TYPES = [
  {
    type: "Essential Cookies",
    description: "Required for basic platform functionality",
    icon: Server,
  },
  {
    type: "Preference Cookies",
    description: "Remember your settings and preferences",
    icon: UserCheck,
  },
  {
    type: "Analytics Cookies",
    description: "Help us understand how you use the platform",
    icon: Database,
  },
] as const;

export default function Privacy() {
  return (
    <div className="">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-lg">
          How we handle, protect, and respect your data
        </p>
        <div className="flex items-center justify-center gap-3 mt-3">
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Badge>
          <Badge variant="outline">GDPR Compliant</Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {SUMMARY_CARDS.map((item) => (
          <Card key={item.title} className="border-border/50">
            <CardContent className="pt-6 text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <h3 className="font-medium text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-8">
        {/* Section 1: Introduction */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>1. Introduction</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              At Zentro, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our HR and Payroll platform.
            </p>
            <div className="bg-secondary/30 p-4 rounded-lg border border-border/50">
              <p className="text-sm font-medium text-foreground flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  This policy applies to all users of the Zentro platform,
                  including employees, HR professionals, managers, and
                  administrators.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Section 2: Data We Collect */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/50">
                <Database className="h-5 w-5 text-foreground" />
              </div>
              <CardTitle>2. Data We Collect</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {DATA_COLLECTION_SECTIONS.map((section) => (
                <div
                  key={section.title}
                  className="p-4 rounded-lg border border-border/50 bg-secondary/10"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <section.icon className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-foreground">
                      {section.title}
                    </h4>
                  </div>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-1 text-sm text-muted-foreground">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-success" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Section 3: How We Use Data */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Fingerprint className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>3. How We Use Your Data</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {DATA_USAGE_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="h-4 w-4 text-primary" />
                    <h4 className="font-medium text-foreground">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Section 4: Data Security */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Lock className="h-5 w-5 text-success" />
              </div>
              <CardTitle>4. Data Security Measures</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-secondary/20 border border-border/50">
                <h4 className="font-medium text-foreground mb-2">
                  Security Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SECURITY_FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Section 5: Your Rights */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>5. Your Privacy Rights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {PRIVACY_RIGHTS.map((right) => (
                <div
                  key={right.title}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-secondary/50 shrink-0">
                    <right.icon className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {right.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {right.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Section 6: Data Retention */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/50">
                <Clock className="h-5 w-5 text-foreground" />
              </div>
              <CardTitle>6. Data Retention Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We retain your personal data only for as long as necessary to
                fulfill the purposes outlined in this policy, unless a longer
                retention period is required or permitted by law.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RETENTION_POLICIES.map((policy) => (
                  <div
                    key={policy.title}
                    className="p-4 rounded-lg border border-border/50"
                  >
                    <h4 className="font-medium text-foreground">
                      {policy.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {policy.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Section 7: Cookies */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/50">
                <Cookie className="h-5 w-5 text-foreground" />
              </div>
              <CardTitle>7. Cookies & Tracking</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We use cookies to enhance your experience and improve our
                platform:
              </p>
              <div className="grid gap-3">
                {COOKIE_TYPES.map((cookie) => (
                  <div
                    key={cookie.type}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10 border border-border/50"
                  >
                    <cookie.icon className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">
                        {cookie.type}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {cookie.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      Required
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Section 8: Contact */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              If you have questions about this Privacy Policy or our data
              practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="mailto:privacy@zentro.com"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors gap-2"
              >
                <Mail className="h-4 w-4" />
                Email Privacy Team
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors gap-2"
              >
                Contact Support
              </Link>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-secondary/20 border border-border/50">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">
                  Data Protection Officer:
                </strong>{" "}
                privacy@zentro.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
