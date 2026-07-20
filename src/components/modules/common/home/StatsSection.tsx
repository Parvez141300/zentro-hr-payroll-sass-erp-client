import { Building2, Shield, Star, Users } from "lucide-react";

const StatsSection = () => {
  const stats = [
    { value: "10,000+", label: "Active Users", icon: Users },
    { value: "500+", label: "Companies", icon: Building2 },
    { value: "99.9%", label: "Uptime", icon: Shield },
    { value: "4.9/5", label: "User Rating", icon: Star },
  ];

  return (
    <section className="py-16 bg-secondary/10">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;