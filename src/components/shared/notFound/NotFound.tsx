// src/app/not-found.tsx
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Home,
  Search,
  CreditCard,
  LayoutDashboard,
  UserRoundCheck,
  Info,
  Contact,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/shared/logo/Logo";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const quickLinks = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Home", href: "/home", icon: Home },
    { title: "Attendance", href: "/attendance", icon: UserRoundCheck },
    { title: "Payroll", href: "/payroll", icon: CreditCard },
    { title: "About", href: "/about", icon: Info },
    { title: "Contact", href: "/contact", icon: Contact },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-primary/5 p-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo className="flex-col" width={120} height={40} />
          </div>
        </div>

        <Card className="border-border/50 shadow-xl overflow-hidden">
          {/* Decorative gradient bar at top */}
          <div className="h-2 w-full bg-linear-to-r from-primary via-primary/50 to-secondary" />

          <CardHeader className="text-center pt-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-7xl font-bold text-primary">404</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center animate-pulse">
                  <span className="text-destructive text-sm font-bold">!</span>
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
              Oops! Page Not Found
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              We couldn&apos;t find the page you&apos;re looking for. It might
              have been moved, deleted, or the URL might be incorrect.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Search suggestion */}
            <div className="bg-secondary/20 rounded-lg p-4 border border-border/50">
              <p className="text-sm text-muted-foreground text-center">
                <Search className="h-4 w-4 inline-block mr-2 text-primary" />
                Try searching for what you need or go back to the homepage.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-sm font-medium text-foreground mb-4 text-center">
                Quick Navigation
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {quickLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                        {link.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Error Code */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-mono">
                Error Code: 404 • Page Not Found
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pb-8">
            <Link href="/">
              <Button
                variant="default"
                size="lg"
                className="gap-2 w-full sm:w-auto"
              >
                <Home className="h-4 w-4" />
                Go to Homepage
              </Button>
            </Link>
            <Link href="javascript:history.back()">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 w-full sm:w-auto"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Zentro HR & Payroll. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
