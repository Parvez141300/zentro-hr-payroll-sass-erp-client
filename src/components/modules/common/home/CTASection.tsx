import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTASection = () => (
  <section className="py-20 bg-linear-to-r from-primary/10 via-secondary/10 to-primary/5 rounded-xl">
    <div className="px-4 text-center">
      <Badge variant="secondary" className="mb-4">
        Get Started Today
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Ready to Transform Your HR Operations?
      </h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
        Join thousands of organizations already using Zentro to streamline their
        HR and payroll processes.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" className="gap-2">
          <Link href={"/register"} className="flex items-center gap-2">
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline">
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        No credit card required. Free for infinite days with limited features.
      </p>
    </div>
  </section>
);

export default CTASection;
