import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Clock,
  CreditCard,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";

const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: "HR Management",
      description:
        "Complete employee lifecycle management from onboarding to exit.",
      color: "primary",
    },
    {
      icon: Clock,
      title: "Attendance Tracking",
      description:
        "Track attendance with employee name, email and mobile number.",
      color: "primary",
    },
    {
      icon: Calendar,
      title: "Leave Management",
      description:
        "Automated leave requests, approvals, and calendar integration.",
      color: "primary",
    },
    {
      icon: CreditCard,
      title: "Payroll Processing",
      description:
        "Automated payroll with tax calculations and direct deposit.",
      color: "primary",
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      description:
        "Data-driven insights with customizable reports and dashboards.",
      color: "primary",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with role-based access and encryption.",
      color: "primary",
    },
  ];

  return (
    <section className="py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Manage Your Workforce
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of tools designed to streamline HR operations
            and empower your organization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="border-border/50 hover:border-primary/30 transition-all hover:shadow-lg group"
              >
                <CardHeader>
                  <div
                    className={cn(
                      "p-3 rounded-lg w-fit mb-4",
                      `bg-${feature.color}/10`,
                    )}
                  >
                    <Icon className={cn("h-5 w-5", `text-${feature.color}`)} />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href={"/terms"}>
                    <Button
                      variant="ghost"
                      className="gap-2 p-0 h-auto hover:bg-transparent group-hover:text-primary hover:underline"
                    >
                      Learn More <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
