
import Link from "next/link";
import {
  Clock,
  Smartphone,
  Fingerprint,
  BarChart3,
  ClockArrowUp,
  Bell,
  Shield,
  ArrowRight,
  Check,
  Monitor,
  MapPin,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


const FEATURES_LIST = [
  {
    icon: Fingerprint,
    title: "Biometric Integration",
    description:
      "Seamless integration with biometric devices for accurate attendance tracking",
  },
  {
    icon: Smartphone,
    title: "Mobile Check-in",
    description:
      "Employees can check in/out from anywhere using the mobile app",
  },
  {
    icon: Monitor,
    title: "Web Dashboard",
    description: "Real-time attendance dashboard with comprehensive insights",
  },
  {
    icon: MapPin,
    title: "Geofencing",
    description:
      "Location-based attendance tracking with geofencing capabilities",
  },
  {
    icon: ClockArrowUp,
    title: "Overtime Tracking",
    description: "Automatic overtime calculation based on attendance records",
  },
  {
    icon: BarChart3,
    title: "Attendance Reports",
    description: "Customizable reports for attendance analysis and compliance",
  },
  {
    icon: Bell,
    title: "Automated Notifications",
    description:
      "Smart alerts for late arrivals, absenteeism, and leave requests",
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Enterprise-grade security for all attendance data",
  },
];

const BENEFITS = [
  "Reduce manual data entry errors",
  "Real-time attendance visibility",
  "Automated payroll integration",
  "Improved employee accountability",
  "Compliance with labor laws",
  "Cost savings through accurate tracking",
];

export default function Attendance() {
  return (
    <div className="container max-w-7xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          Feature
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Smart Attendance Tracking
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Modernize your attendance management with real-time tracking,
          biometric integration, and automated reporting.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <Button size="lg" className="gap-2">
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Feature Image */}
      <div className="relative w-full h-100 rounded-xl overflow-hidden mb-12 bg-linear-to-r from-primary/20 to-secondary/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Clock className="h-20 w-20 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground">
              Attendance Dashboard
            </h2>
            <p className="text-muted-foreground">
              Track employee attendance
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {FEATURES_LIST.map((feature) => (
          <Card
            key={feature.title}
            className="border-border/50 hover:border-primary/30 transition-colors"
          >
            <CardHeader>
              <div className="p-2 rounded-lg bg-primary/10 w-fit">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">{feature.title}</CardTitle>
              <CardDescription className="text-sm">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Separator className="my-12" />

      {/* Benefits Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
        <div>
          <Badge variant="secondary" className="mb-4">
            Benefits
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose Our Attendance Tracking?
          </h2>
          <p className="text-muted-foreground mb-6">
            Transform your attendance management with automated tracking that
            saves time, reduces errors, and provides actionable insights.
          </p>
          <ul className="space-y-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <Check className="h-5 w-5 text-success shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
          <Button className="mt-6">Get Started Today</Button>
        </div>
        <div className="bg-secondary/20 p-8 rounded-xl">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">99.9%</div>
              <p className="text-sm text-muted-foreground">Accuracy Rate</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">10k+</div>
              <p className="text-sm text-muted-foreground">Employees Tracked</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">50%</div>
              <p className="text-sm text-muted-foreground">Time Saved</p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* CTA Section */}
      <div className="text-center bg-linear-to-r from-primary/5 to-secondary/5 p-12 rounded-xl">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Ready to Simplify Attendance Management?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of companies using Zentro to manage their HR & Payroll
          operations.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="gap-2">
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
