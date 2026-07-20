// src/components/home/FaqSection.tsx
"use client";

import { useState } from "react";
import {
  HelpCircle,
  CreditCard,
  Shield,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
  category?: "general" | "pricing" | "security" | "features";
}

const faqData: FaqItem[] = [
  // General Questions
  {
    question: "What is Zentro HR & Payroll?",
    answer:
      "Zentro is a comprehensive HR and Payroll ERP platform that centralizes employee management, attendance tracking, leave administration, payroll processing, and workforce analytics in a single secure system.",
    category: "general",
  },
  {
    question: "Who is Zentro designed for?",
    answer:
      "Zentro is designed for growing organizations of all sizes—from small startups to large enterprises—looking to streamline their HR operations and automate payroll processing.",
    category: "general",
  },
  {
    question: "How does Zentro compare to other HR platforms?",
    answer:
      "Zentro stands out with its comprehensive feature set, modern UI, enterprise-grade security, and flexible pricing. Unlike many competitors, we offer both international (Stripe) and local (SSLCommerz) payment processing, making it ideal for Bangladeshi businesses.",
    category: "general",
  },

  // Pricing Questions
  {
    question: "What are the pricing plans?",
    answer:
      "We offer flexible pricing plans to suit organizations of all sizes. Our Free plan supports up to 10 employees, Basic plan supports up to 50 employees, Pro plan supports up to 200 employees, and Enterprise offers custom solutions. All plans include core HR features.",
    category: "pricing",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! We offer a 14-day free trial with full access to all Pro features. No credit card required. You can cancel anytime during the trial period.",
    category: "pricing",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept both international payments via Stripe (credit cards, PayPal) and local payments via SSLCommerz (bKash, Nagad, Rocket, bank transfers) for Bangladeshi businesses.",
    category: "pricing",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Absolutely! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle.",
    category: "pricing",
  },

  // Security Questions
  {
    question: "Is my data secure with Zentro?",
    answer:
      "Yes! We use enterprise-grade security with end-to-end encryption, role-based access control, regular security audits, and comply with global standards including GDPR. Your data is stored securely in ISO 27001 certified data centers.",
    category: "security",
  },
  {
    question: "Who has access to my data?",
    answer:
      "Access to your data is strictly controlled through our role-based access system. Only authorized users with appropriate permissions (Super Admin, Admin, HR, Manager, or Employee) can access specific data based on their role.",
    category: "security",
  },
  {
    question: "Does Zentro comply with data protection laws?",
    answer:
      "Yes, Zentro is fully compliant with GDPR, CCPA, and other international data protection regulations. We also adhere to local data protection laws in the countries we operate in.",
    category: "security",
  },

  // Features Questions
  {
    question: "What features does Zentro include?",
    answer:
      "Zentro includes comprehensive HR management, real-time attendance tracking, automated leave management, payroll processing with tax calculations, advanced analytics and reporting, employee self-service portal, and seamless integrations.",
    category: "features",
  },
  {
    question: "Can I track employee attendance remotely?",
    answer:
      "Yes! Our attendance tracking system supports multiple methods including biometric integration, mobile check-in with GPS, web-based check-in, and manual entry. Employees can check in/out from anywhere.",
    category: "features",
  },
  {
    question: "Does Zentro handle payroll taxes?",
    answer:
      "Yes! Our payroll system automatically calculates taxes, deductions, and compliance requirements based on your location. We support multiple tax regimes and keep up-to-date with regulatory changes.",
    category: "features",
  },
  {
    question: "Can employees access their own data?",
    answer:
      "Yes! Employees have their own self-service portal where they can view payslips, track attendance, apply for leave, update personal information, and access company documents—all in one place.",
    category: "features",
  },
];

// Category icons and labels
const categoryConfig = {
  general: { icon: HelpCircle, label: "General", color: "primary" },
  pricing: { icon: CreditCard, label: "Pricing", color: "secondary" },
  security: { icon: Shield, label: "Security", color: "destructive" },
  features: { icon: Zap, label: "Features", color: "accent" },
} as const;

// FAQ Categories for filtering
const categories = [
  { value: "all", label: "All Questions" },
  { value: "general", label: "General" },
  { value: "pricing", label: "Pricing" },
  { value: "security", label: "Security" },
  { value: "features", label: "Features" },
];

interface FaqSectionProps {
  className?: string;
  showFilter?: boolean;
  showCTA?: boolean;
}

export function FaqSection({
  className,
  showFilter = true,
  showCTA = true,
}: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className={cn("py-20", className)}>
      <div>
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to the most common questions about Zentro HR & Payroll
            platform.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 max-w-xl mx-auto">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Category Filter */}
          {showFilter && (
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    activeCategory === cat.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No questions found matching your criteria.
              </p>
            </div>
          ) : (
            <Accordion className="space-y-4">
              {filteredFaqs.map((faq, index) => {
                const config = faq.category
                  ? categoryConfig[faq.category as keyof typeof categoryConfig]
                  : categoryConfig.general;
                const Icon = config.icon;

                return (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border/50 rounded-lg px-4 hover:border-primary/30 transition-colors data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-start gap-3 text-left">
                        <div className="mt-1 p-1 rounded-full bg-primary/10 shrink-0">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                      {faq.answer}
                      {faq.category && (
                        <Badge variant="outline" className="mt-3 text-xs">
                          {config.label}
                        </Badge>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </div>

        {/* CTA Section */}
        {showCTA && (
          <>
            <Separator className="my-12" />
            <div className="text-center bg-linear-to-r from-primary/5 to-secondary/5 p-8 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Still have questions?
                </h3>
              </div>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-6">
                Can&apos;t find what you&apos;re looking for? Our team is here to help you
                with any questions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline">
                  <Link href="/faq">View All FAQs</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default FaqSection;
