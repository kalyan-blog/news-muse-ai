import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NewsArticle } from "@/data/mockNews";
import NewsCard from "./NewsCard";

interface NewsCarouselProps {
  articles: NewsArticle[];
  title: string;
  icon: React.ReactNode;
}

const NewsCarousel = ({ articles, title, icon }: NewsCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (articles.length === 0) return null;

  return (
    <section className="animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="font-semibold text-foreground">{title}</h2>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => scroll("left")}
            className="p-1.5 rounded-full bg-secondary hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1.5 rounded-full bg-secondary hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {articles.map((article) => (
          <div key={article.id} className="min-w-[260px] max-w-[280px] snap-start shrink-0">
            <NewsCard article={article} compact />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsCarousel;
