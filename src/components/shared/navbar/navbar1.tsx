"use client";

import {
  Book,
  Menu,
  Zap,
  Siren,
  UserCheck,
  UserRoundX,
  HandCoins,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Logo from "../logo/Logo";
import Link from "next/link";
import BorderBeamButton from "../buttons/BorderBeamButton";
import { ThemeToggle } from "../themeToggle/ThemeToggle";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getClientLoggedInUserInfo } from "@/actions/auth.action";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Features",
      url: "#",
      items: [
        {
          title: "Attendance",
          description: "Manage and Track employee attendance",
          icon: <UserCheck className="size-5 shrink-0" />,
          url: "/attendance",
        },
        {
          title: "Leave",
          description: "Manage and Track employee leave requests",
          icon: <UserRoundX className="size-5 shrink-0" />,
          url: "/leave",
        },
        {
          title: "Payroll",
          description:
            "Generate and manage employee payroll with ease and accuracy",
          icon: <HandCoins className="size-5 shrink-0" />,
          url: "/payroll",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "About Us",
          description: "Get to know about our company and our mission",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/about",
        },
        {
          title: "Terms of Service",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "/terms",
        },
        {
          title: "Privacy & Policy",
          description: "Our terms and conditions for using our services",
          icon: <Siren className="size-5 shrink-0" />,
          url: "/privacy",
        },
      ],
    },
    {
      title: "Pricing",
      url: "/pricing",
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ],
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const pathName = usePathname();
  const [session, setSession] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  console.log(session, "this from session data")

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const response = await getClientLoggedInUserInfo();
        const data = response.data;
        setSession(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
      }
    };

    fetchSession();
  }, [])

  return (
    <section className={cn("py-4", className)}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Logo width={70} height={30} />
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item, pathName))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <ThemeToggle />
            <Link href={auth.signup.url}>
              <BorderBeamButton>{auth.signup.title}</BorderBeamButton>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo width={50} height={20} />
            <Sheet>
              <SheetTrigger render={<Button variant="outline" size="icon" />}>
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Logo width={50} height={20} />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion className="flex w-full flex-col gap-4">
                    {menu.map((item) => renderMobileMenuItem(item, pathName))}
                  </Accordion>

                  <div className="flex items-center justify-between">
                    <ThemeToggle />
                    <Link href={auth.signup.url}>
                      <BorderBeamButton>{auth.signup.title}</BorderBeamButton>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem, pathName: string) => {
  const isActive = pathName === item.url;
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink
              key={subItem.title}
              className="w-80"
              render={<SubMenuLink item={subItem} />}
            ></NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className={cn(
          "group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium hover:underline",
          isActive ? "underline font-bold" : "",
        )}
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem, pathName: string) => {
  const isActive = pathName === item.url;

  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.url}
      className={cn("text-md font-semibold hover:no-underline", isActive ? "underline font-bold" : "")}
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground hover:underline"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar1 };
