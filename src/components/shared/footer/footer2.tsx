import { cn } from "@/lib/utils";
import Logo from "../logo/Logo";

interface FooterLink {
  name: string;
  href: string;
}
interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface BusinessAddress {
  street: string;
  city: string;
  zip: string;
  country: string;
}

interface FooterBasicProps {
  description?: string;
  sections?: FooterSection[];
  businessAddress?: BusinessAddress;
  copyright?: string;
  legalLinks?: FooterLink[];
  className?: string;
}

interface Footer2Props extends FooterBasicProps {
  logoClassName?: string;
}
type Props = Partial<Footer2Props>;

const defaultProps: Footer2Props = {
  description:
    "Streamline employee management, attendance tracking, payroll processing, and workforce analytics in a single secure platform. This platform is designed to empower organizations with intelligent HR and payroll solutions that streamline operations, enhance employee experiences, and drive business growth.",
  sections: [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Attendance", href: "/" },
        { name: "Leave", href: "/leave" },
        { name: "Payroll", href: "/payroll" },
        { name: "Pricing", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ],
  businessAddress: {
    city: "Dhaka",
    country: "Bangladesh",
    street: "300, Mirpur Road",
    zip: "1207",
  },
  copyright: `© ${new Date().getFullYear()} Zentro HR & Payroll. All rights reserved.`,
  legalLinks: [
    { name: "Terms and Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

const MAX_SECTIONS = 3;

const Footer2 = (props: Props) => {
  const { description, sections, businessAddress, copyright, legalLinks, className } = {
    ...defaultProps,
    ...props,
  };

  const visibleSections = (sections ?? []).slice(0, MAX_SECTIONS);

  return (
    <section className={cn("py-16 bg-accent", className)}>
      <div className="max-w-7xl mx-auto px-4">
        <footer>
          <div className="grid grid-cols-1 gap-8 md:gap-16 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center lg:justify-start">
                <Logo />
              </div>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                {description}
              </p>
            </div>
            {visibleSections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 text-sm font-semibold tracking-tight">
                  {section.title}
                </h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-tight">
                Address
              </h3>
              <p>
                {businessAddress?.street}
                <br />
                {businessAddress?.city}, {businessAddress?.zip}
                <br />
                {businessAddress?.country}
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border pt-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {legalLinks?.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
