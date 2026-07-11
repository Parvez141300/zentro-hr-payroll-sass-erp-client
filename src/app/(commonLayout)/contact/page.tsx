// src/app/(public)/contact/page.tsx
import React from "react";
import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/shared/logo/Logo";
import ContactForm from "@/components/modules/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Zentro HR & Payroll",
  description:
    "Get in touch with our team for any questions about Zentro HR & Payroll platform",
};

// Contact information data
const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      "123 Tech Park Drive",
      "Silicon Valley, CA 94043",
      "United States",
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["support@zentro.com", "sales@zentro.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: Closed"],
  },
] as const;

export default function ContactPage() {
  return (
    <div className="container py-12 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Globe className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">Contact Us</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Have questions about Zentro? We&apos;re here to help! Reach out to our
          team and we&apos;ll get back to you as soon as possible.
        </p>
        <Badge variant="secondary" className="mt-3">
          Response within 24 hours
        </Badge>
      </div>

      {/* ✅ Keep your original 3-column grid layout */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Column - Contact Information & Map */}
        <div className="lg:col-span-1 space-y-6">
          {/* Logo & Brand */}
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <div className="flex justify-center">
                <Logo className="flex-col" />
              </div>
              <p className="text-center text-muted-foreground text-sm mt-2">
                Modern HR & Payroll Platform
              </p>
            </CardContent>
          </Card>

          {/* Contact Cards */}
          {contactInfo.map((info) => (
            <Card
              key={info.title}
              className="border-border/50 hover:border-primary/30 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {info.title}
                    </h3>
                    {info.details.map((detail, index) => (
                      <p key={index} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Map Section */}
          <Card className="border-border/50 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Find Us</CardTitle>
              <CardDescription>Our headquarters location</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full h-62.5 bg-muted/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.166345987921!2d-122.08301668469273!3d37.42202697982578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba2b4b3b8b8b%3A0x3b8b8b8b8b8b8b8b!2sGoogleplex!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Zentro Headquarters Location"
                  className="absolute inset-0"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}