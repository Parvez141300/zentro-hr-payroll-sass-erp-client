import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "Zentro has completely transformed how we manage payroll and HR. Our team saves 10+ hours every month.",
      author: "Sarah Johnson",
      role: "HR Director, TechCorp",
    },
    {
      quote:
        "The attendance tracking feature is a game-changer. Real-time visibility into our workforce has improved productivity significantly.",
      author: "Michael Chen",
      role: "COO, InnovateLabs",
    },
    {
      quote:
        "Exceptional platform with incredible support. The payroll automation alone made it worth the investment.",
      author: "Emily Rodriguez",
      role: "Finance Manager, GrowthCo",
    },
    {
      quote:
        "Exceptional platform with incredible support. The payroll automation alone made it worth the investment.",
      author: "Emily Rodriguez",
      role: "Finance Manager, GrowthCo",
    },
    {
      quote:
        "Exceptional platform with incredible support. The payroll automation alone made it worth the investment.",
      author: "Emily Rodriguez",
      role: "Finance Manager, GrowthCo",
    },
    {
      quote:
        "Exceptional platform with incredible support. The payroll automation alone made it worth the investment.",
      author: "Emily Rodriguez",
      role: "Finance Manager, GrowthCo",
    },
  ];

  return (
    <section className="py-20">
      <div>
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Loved by Organizations Worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our customers say about their experience with Zentro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50">
              <CardHeader>
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <CardDescription className="text-base">
                  &quot;{testimonial.quote}&quot;
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col items-start">
                <p className="font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
