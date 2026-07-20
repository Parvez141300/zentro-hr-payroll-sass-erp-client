import { Badge } from "@/components/ui/badge";
import { CreditCard, UserCheck, Users } from "lucide-react";

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserCheck,
      title: "Sign Up",
      description: "Create your account and set up your organization profile.",
    },
    {
      icon: Users,
      title: "Add Employees",
      description: "Import or invite your team members to the platform.",
    },
    {
      icon: CreditCard,
      title: "Run Payroll",
      description: "Process payroll with automated calculations and compliance.",
    },
  ];

  return (
    <section className="py-16 bg-secondary/5">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">How It Works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple three-step process to transform your HR operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;