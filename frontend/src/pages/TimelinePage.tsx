import { useState } from "react";
import { NewsCategory } from "@/data/mockNews";
import { useTimeline } from "@/api";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const categories: NewsCategory[] = ["Tech", "Sports", "Politics", "Business", "Health"];

const TimelinePage = () => {
  const [year, setYear] = useState(2020);
  const [filter, setFilter] = useState<NewsCategory | "All">("All");
  const [expanded, setExpanded] = useState<number | null>(null);

  const { data: timelineEvents = [], isLoading } = useTimeline();

  const filtered = timelineEvents.filter((e) => {
    const matchYear = e.year <= year;
    const matchCat = filter === "All" || e.category === filter;
    return matchYear && matchCat;
  });

  if (isLoading) return <div className="px-4 pt-6"><LoadingSkeleton count={4} /></div>;

  return (
    <div className="px-4 pt-6 pb-24 max-w-2xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Timeline</h1>
        <p className="text-sm text-muted-foreground mt-1">Explore history from 1990 to today</p>
      </div>

      {/* Year Slider */}
      <div className="bg-card rounded-2xl p-5 shadow-card animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-muted-foreground">1990</span>
          <span className="text-lg font-bold gradient-text">{year}</span>
          <span className="text-xs text-muted-foreground">2025</span>
        </div>
        <Slider
          min={1990}
          max={2025}
          step={1}
          value={[year]}
          onValueChange={([v]) => setYear(v)}
          className="w-full"
        />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 flex-wrap animate-fade-in">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as NewsCategory | "All")}
            className={`chip ${filter === cat ? "chip-active" : "chip-inactive"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
        <div className="space-y-4">
          {filtered.map((event, i) => (
            <div
              key={`${event.year}-${event.title}`}
              className="relative pl-10 animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="absolute left-2.5 top-3 w-3 h-3 rounded-full gradient-primary border-2 border-background" />
              <div className="bg-card rounded-xl p-4 shadow-card transition-all duration-300 hover:shadow-elevated">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold gradient-text">{event.year}</span>
                  <span className="chip chip-inactive text-[10px] py-0.5">{event.category}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm">{event.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex items-center gap-1 text-xs text-primary mt-2 font-medium"
                >
                  {expanded === i ? "Show less" : "Read more"}
                  {expanded === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expanded === i ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-xs text-muted-foreground border-t border-border pt-2">
                    {event.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
