
import Link from "next/link";
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
import {
  Building2,
  Users,
  Shield,
  Rocket,
  Award,
  Heart,
  Target,
  Eye,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  UserCheck,
  Clock,
  BarChart3,
  CreditCard,
  Code,
  Server,
  Cloud,
  Calendar,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Logo from "@/components/shared/logo/Logo";

// Company stats
const STATS = [
  {
    value: "10,000+",
    label: "Active Users",
    icon: Users,
  },
  {
    value: "500+",
    label: "Companies",
    icon: Building2,
  },
  {
    value: "99.9%",
    label: "Uptime",
    icon: Shield,
  },
  {
    value: "4.9/5",
    label: "User Rating",
    icon: Award,
  },
];

// Mission & Vision
const MISSION_VISION = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To empower organizations with intelligent HR and payroll solutions that streamline operations, enhance employee experiences, and drive business growth.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To become the world's most trusted HR and payroll platform, enabling every organization to build a thriving workforce and achieve operational excellence.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Innovation, integrity, customer-centricity, and continuous improvement drive everything we do at Zentro.",
  },
];

// Core Values
const CORE_VALUES = [
  {
    icon: Sparkles,
    title: "Innovation First",
    description:
      "We continuously evolve our platform with cutting-edge technology to meet the changing needs of modern workplaces.",
  },
  {
    icon: Users,
    title: "Customer-Centric",
    description:
      "Our customers are at the heart of everything we do. We listen, learn, and build solutions that solve real problems.",
  },
  {
    icon: Shield,
    title: "Security & Trust",
    description:
      "Enterprise-grade security with end-to-end encryption, regular audits, and compliance with global standards.",
  },
  {
    icon: Rocket,
    title: "Continuous Growth",
    description:
      "We're committed to continuous improvement, learning, and innovation to deliver the best possible experience.",
  },
];

// Technology Stack
const TECH_STACK = [
  {
    category: "Frontend",
    icon: Code,
    technologies: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "TanStack Query",
      "TanStack Form",
    ],
  },
  {
    category: "Backend",
    icon: Server,
    technologies: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
      "REST API",
      "WebSocket",
    ],
  },
  {
    category: "Infrastructure",
    icon: Cloud,
    technologies: [
      "Docker",
      "AWS",
      "Redis",
      "RabbitMQ",
      "Nginx",
      "CI/CD Pipeline",
      "Monitoring",
    ],
  },
  {
    category: "Security",
    icon: Lock,
    technologies: [
      "Better Auth",
      "JWT Authentication",
      "2FA",
      "RBAC",
      "Data Encryption",
      "GDPR Compliant",
      "SOC 2",
    ],
  },
];

// Team Members
const TEAM_MEMBERS = [
  {
    name: "John Doe",
    role: "CEO & Co-Founder",
    image: "/assets/team/john-doe.jpg",
    bio: "Passionate about building products that transform how businesses manage their workforce.",
  },
  {
    name: "Jane Smith",
    role: "CTO & Co-Founder",
    image: "/assets/team/jane-smith.jpg",
    bio: "Technical visionary with expertise in scalable architecture and enterprise solutions.",
  },
  {
    name: "Mike Johnson",
    role: "Head of Product",
    image: "/assets/team/mike-johnson.jpg",
    bio: "Product strategist focused on delivering exceptional user experiences.",
  },
  {
    name: "Sarah Williams",
    role: "Head of Engineering",
    image: "/assets/team/sarah-williams.jpg",
    bio: "Engineering leader passionate about building high-performance teams and systems.",
  },
];

// Features
const FEATURES = [
  {
    icon: UserCheck,
    title: "HR Management",
    description:
      "Complete employee lifecycle management from onboarding to exit.",
  },
  {
    icon: Clock,
    title: "Attendance Tracking",
    description: "Real-time attendance with biometric and mobile check-in.",
  },
  {
    icon: Calendar,
    title: "Leave Management",
    description:
      "Automated leave requests, approvals, and calendar integration.",
  },
  {
    icon: CreditCard,
    title: "Payroll Processing",
    description: "Automated payroll with tax calculations and direct deposit.",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    description:
      "Data-driven insights with customizable reports and dashboards.",
  },
  {
    icon: Shield,
    title: "Compliance",
    description: "Stay compliant with automated tax and regulatory updates.",
  },
];

export default function About() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <Logo className="flex-col" />
        </div>
        <Badge variant="secondary" className="mb-4">
          About Zentro
        </Badge>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Transforming HR & Payroll
          <br />
          <span className="text-primary">for the Modern Workplace</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Zentro is a comprehensive HR and Payroll ERP platform designed to
          centralize employee management, streamline operations, and empower
          growing organizations to thrive.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {STATS.map((stat) => (
          <Card key={stat.label} className="text-center border-border/50">
            <CardContent className="pt-6">
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {MISSION_VISION.map((item) => (
          <Card key={item.title} className="border-border/50">
            <CardHeader>
              <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Separator className="my-16" />

      {/* Core Values */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            Core Values
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            What Drives Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our core values shape our culture, guide our decisions, and define
            how we serve our customers.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_VALUES.map((value) => (
            <Card key={value.title} className="border-border/50">
              <CardHeader>
                <div className="p-2 rounded-lg bg-primary/10 w-fit">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">{value.title}</CardTitle>
                <CardDescription className="text-sm">
                  {value.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-16" />

      {/* Features Section */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Comprehensive HR & Payroll Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your workforce efficiently in one
            powerful platform.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="border-border/50">
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
      </div>

      <Separator className="my-16" />

      {/* Technology Stack */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            Technology
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Built with Modern Technology
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leveraging cutting-edge technologies to deliver a secure, scalable,
            and performant HR platform.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_STACK.map((tech) => (
            <Card key={tech.category} className="border-border/50">
              <CardHeader>
                <div className="p-2 rounded-lg bg-secondary/50 w-fit">
                  <tech.icon className="h-5 w-5 text-foreground" />
                </div>
                <CardTitle className="text-base">{tech.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {tech.technologies.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-3 w-3 text-success shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-16" />

      {/* Team Section */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            Our Team
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Meet the Team Behind Zentro
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate team of innovators, engineers, and product enthusiasts
            building the future of HR technology.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <Card key={member.name} className="border-border/50 text-center">
              <CardHeader>
                <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle className="text-base">{member.name}</CardTitle>
                <CardDescription className="text-sm">
                  {member.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-16" />

      {/* CTA Section */}
      <div className="text-center bg-linear-to-r from-primary/5 to-secondary/5 p-12 rounded-xl">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Ready to Transform Your HR Operations?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of organizations using Zentro to streamline their HR
          and payroll processes.
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

      {/* Footer Contact Info */}
      <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="font-medium text-foreground">Address</p>
            <p className="text-sm text-muted-foreground">
              123 Tech Park Drive, Silicon Valley, CA 94043
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="font-medium text-foreground">Phone</p>
            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="font-medium text-foreground">Email</p>
            <p className="text-sm text-muted-foreground">info@zentro.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
