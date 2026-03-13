import { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Léa",
    age: 21,
    text: "Ça évite les messages gênants dans le groupe. Tu sais direct qui est chaud.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Thomas",
    age: 19,
    text: "J'ai trouvé des gens chauds pour sortir sans forcer. Simple.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Inès",
    age: 22,
    text: "Enfin une app sociale sans malaise. J'attends le lancement public.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Mathis",
    age: 20,
    text: "Je découvre des plans que j'aurais jamais connu sinon.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Chloé",
    age: 23,
    text: "Nouvelle dans ma ville. WeOut m'a aidé à rencontrer du monde.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Lucas",
    age: 18,
    text: "Plus besoin d'attendre que quelqu'un propose. Tu proposes, point.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face",
  },
];

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const speed = 0.4;

    const scroll = () => {
      scrollPosition += speed;
      
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => cancelAnimationFrame(animationFrameId);
    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="section-spacing overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-muted/20 to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/5 blur-[150px]" />
      
      <div className="container-narrow mb-12 relative z-10">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent mb-4">
            Retours bêta
          </span>
          <h2 className="section-title">
            Ils testent <span className="text-accent">WeOut</span>.
          </h2>
        </div>
      </div>

      {/* Horizontal scrolling carousel - larger cards */}
      <div 
        ref={scrollRef}
        className="flex gap-5 overflow-x-hidden px-6 cursor-grab relative z-10"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 p-6 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border border-border/40 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-5">
              {/* Real photo avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/30">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="font-medium text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.age} ans</p>
              </div>
            </div>
            <p className="text-foreground/90 leading-relaxed">
              "{testimonial.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
