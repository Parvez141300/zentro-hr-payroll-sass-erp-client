import Link from "next/link";
import {
  Calculator,
  FileText,
  Shield,
  Clock,
  Building2,
  ArrowRight,
  DollarSign,
  Receipt,
  Download,
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
    icon: Calculator,
    title: "Automated Calculations",
    description:
      "Automatic salary calculations with tax and deduction handling",
  },
  {
    icon: DollarSign,
    title: "Direct Deposit",
    description: "Secure direct deposit with multiple payment options",
  },
  {
    icon: FileText,
    title: "Tax Compliance",
    description: "Automatic tax calculations and regulatory compliance",
  },
  {
    icon: Shield,
    title: "Payroll Security",
    description: "Enterprise-grade security for sensitive payroll data",
  },
  {
    icon: Clock,
    title: "Payroll Scheduling",
    description: "Customizable payroll schedules and automated runs",
  },
  {
    icon: Building2,
    title: "Multi-company",
    description: "Support for multiple companies and entities",
  },
  {
    icon: Receipt,
    title: "Payroll Reports",
    description: "Comprehensive reports for payroll analysis",
  },
  {
    icon: Download,
    title: "Payroll Export",
    description: "Export payroll data for accounting and compliance",
  },
];

export default function Payroll() {
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          Feature
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Automated Payroll Processing
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Simplify payroll with automated calculations, tax compliance, and
          secure direct deposit for your entire workforce.
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-primary">95%</div>
            <p className="text-sm text-muted-foreground">Faster Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-primary">100%</div>
            <p className="text-sm text-muted-foreground">Tax Compliance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-primary">50%</div>
            <p className="text-sm text-muted-foreground">Cost Reduction</p>
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

      {/* CTA */}
      <div className="text-center bg-linear-to-r from-primary/5 to-secondary/5 p-12 rounded-xl">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Simplify Your Payroll Processing
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Start processing payroll efficiently with automated calculations and
          tax compliance.
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
