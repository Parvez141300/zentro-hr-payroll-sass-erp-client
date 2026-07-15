import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Users,
  Bell,
  FileText,
  Settings,
  ArrowRight,
  Check,
  Calendar,
  UserCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const FEATURES_LIST = [
  {
    icon: Calendar,
    title: "Leave Requests",
    description: "Easy leave request submission with automated workflows",
  },
  {
    icon: UserCheck,
    title: "Approval Workflows",
    description: "Multi-level approval workflows with automatic notifications",
  },
  {
    icon: CalendarDays,
    title: "Leave Calendar",
    description: "Visual calendar view of all employee leaves",
  },
  {
    icon: Clock,
    title: "Leave Balance",
    description: "Real-time leave balance tracking and accrual management",
  },
  {
    icon: FileText,
    title: "Leave Policies",
    description: "Customizable leave policies for different employee types",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Automated notifications for requests and approvals",
  },
  {
    icon: Users,
    title: "Team Overview",
    description: "View team availability and leave schedules at a glance",
  },
  {
    icon: Settings,
    title: "Flexible Configuration",
    description: "Configure leave types, policies, and rules",
  },
];

const LEAVE_TYPES = [
  "Annual Leave",
  "Sick Leave",
  "Casual Leave",
  "Maternity Leave",
  "Paternity Leave",
  "Bereavement Leave",
  "Study Leave",
  "Unpaid Leave",
];

export default function Leave() {
  return (
    <div className="">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          Feature
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Smart Leave Management
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Streamline leave requests, automate approvals, and maintain a balanced
          workforce with intelligent leave management.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <Button size="lg" className="gap-2">
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-primary">60%</div>
            <p className="text-sm text-muted-foreground">Faster Approvals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-primary">100%</div>
            <p className="text-sm text-muted-foreground">Policy Compliance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <p className="text-sm text-muted-foreground">Self-Service Access</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-primary">5x</div>
            <p className="text-sm text-muted-foreground">Efficiency Boost</p>
          </CardContent>
        </Card>
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

      {/* Leave Types */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
        <div>
          <Badge variant="secondary" className="mb-4">
            Supported Leave Types
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Comprehensive Leave Management
          </h2>
          <p className="text-muted-foreground mb-6">
            Support for all types of leave with customizable policies and
            automated calculations.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {LEAVE_TYPES.map((type) => (
              <div
                key={type}
                className="flex items-center gap-2 p-2 rounded-lg bg-secondary/10"
              >
                <Check className="h-4 w-4 text-success shrink-0" />
                <span className="text-sm text-foreground">{type}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-secondary/20 p-8 rounded-xl">
          <div className="flex items-center gap-4 mb-6">
            <CalendarDays className="h-12 w-12 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">
                Smart Calendar View
              </h3>
              <p className="text-sm text-muted-foreground">
                Visual overview of team availability
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-sm">Available (8)</span>
              </div>
              <span className="text-sm text-muted-foreground">Today</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-sm">On Leave (3)</span>
              </div>
              <span className="text-sm text-muted-foreground">2 Requests</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-sm">Pending (2)</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Awaiting Approval
              </span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {/* CTA */}
      <div className="text-center bg-linear-to-r from-primary/5 to-secondary/5 p-12 rounded-xl">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Streamline Your Leave Management
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Start managing leave requests efficiently with automated workflows and
          real-time tracking.
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
