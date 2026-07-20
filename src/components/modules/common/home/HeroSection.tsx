import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  PlayCircle,
  Radio,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";

// Hero Section
const HeroSection = () => (
  <section className="relative overflow-hidden py-20 md:py-32 rounded-xl">
    {/* Background Gradient */}
    <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/5 to-transparent" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

    <div className="container max-w-7xl mx-auto px-4 relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <Badge variant="default" className="gap-2 text-sm">
            <Sparkles className="h-3 w-3" />
            Zentor HR & Payroll Platform
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Modern HR & Payroll
            <span className="text-primary block mt-2">
              for Growing Organizations
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg">
            Streamline employee management, attendance tracking, payroll
            processing, and workforce analytics in a single secure platform.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href={"/register"}>
              <Button size="lg" className="gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2">
              <PlayCircle className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium text-primary"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium">Join 10,000+ companies</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  4.9/5
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
            <div className="aspect-video bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-8">
              <div className="text-center">
                <Building2 className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Dashboard Preview</p>
                <Badge variant="outline" className="mt-2">
                  Interactive Demo
                </Badge>
              </div>
            </div>
            <div className="absolute inset-0 border border-primary/20 rounded-2xl pointer-events-none" />
          </div>

          {/* Floating Cards */}
          <div className="absolute -top-4 -right-4 bg-background rounded-lg shadow-lg border border-border p-3 animate-bounce">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium flex items-center gap-2">
                <Radio /> Live
              </span>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-background rounded-lg shadow-lg border border-border p-3 animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs font-medium">Processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
