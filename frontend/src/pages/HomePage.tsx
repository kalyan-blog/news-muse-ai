import { useState, useEffect } from "react";
import { Zap, TrendingUp, User, Flame, Sparkles } from "lucide-react";
import { NewsCategory } from "@/data/mockNews";
import { useNews, useSummary } from "@/api";
import { useApp } from "@/context/AppContext";
import NewsCard from "@/components/NewsCard";
import NewsCarousel from "@/components/NewsCarousel";
import MoodIndicator from "@/components/MoodIndicator";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const categories: ("All" | NewsCategory)[] = ["All", "Tech", "Sports", "Politics", "Business", "Health"];

const HomePage = () => {
  const { interests, quickRead, readArticles } = useApp();
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeFilter, setActiveFilter] = useState<"All" | NewsCategory>("All");

  const { data: mockNews = [], isLoading: isNewsLoading } = useNews();
  const { data: todaySummary = [], isLoading: isSummaryLoading } = useSummary();

  const loading = isNewsLoading || isSummaryLoading;

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setVisibleCount((c) => Math.min(c + 2, mockNews.length));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mockNews.length]);

  const filtered = activeFilter === "All" ? mockNews : mockNews.filter((n) => n.category === activeFilter);
  const forYou = mockNews.filter((n) => interests.includes(n.category));
  const topNews = mockNews.filter((n) => n.isBreaking || n.confidence >= 90).slice(0, 5);
  const trending = [...mockNews].sort((a, b) => b.confidence - a.confidence).slice(0, 5);
  const becauseYouRead = mockNews.filter((n) => n.relatedTo && readArticles.includes(n.relatedTo));

  if (loading) return <div className="px-4 pt-6 pb-24"><LoadingSkeleton count={3} /></div>;

  return (
    <div className="px-4 pt-6 pb-24 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Good Morning 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">Your AI-powered personalized news assistant</p>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide animate-fade-in" style={{ scrollbarWidth: "none" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`chip whitespace-nowrap ${activeFilter === cat ? "chip-active" : "chip-inactive"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Today in 60 Seconds */}
      <div className="rounded-2xl gradient-primary p-5 text-primary-foreground animate-fade-in">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={18} />
          <h2 className="font-semibold text-sm">Today in 60 Seconds</h2>
        </div>
        <ul className="space-y-2">
          {todaySummary.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm opacity-95">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-foreground/60 shrink-0" />
              {quickRead ? item.split(",")[0] : item}
            </li>
          ))}
        </ul>
      </div>

      {/* Mood Indicator */}
      <MoodIndicator />

      {/* Top News Carousel */}
      <NewsCarousel
        articles={topNews}
        title="Top News"
        icon={<TrendingUp size={16} className="text-primary" />}
      />

      {/* For You Carousel */}
      <NewsCarousel
        articles={forYou.slice(0, 6)}
        title="For You"
        icon={<User size={16} className="text-primary" />}
      />

      {/* Because You Read */}
      {becauseYouRead.length > 0 && (
        <NewsCarousel
          articles={becauseYouRead}
          title="Because You Read…"
          icon={<Sparkles size={16} className="text-primary" />}
        />
      )}

      {/* Trending - vertical feed */}
      <section className="animate-fade-in">
        <div className="flex items-center gap-2 mb-3">
          <Flame size={16} className="text-primary" />
          <h2 className="font-semibold text-foreground">
            {activeFilter === "All" ? "Trending" : activeFilter}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.slice(0, visibleCount).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
