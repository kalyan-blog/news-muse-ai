import { useNews } from "@/api";
import { Progress } from "@/components/ui/progress";
import LoadingSkeleton from "./LoadingSkeleton";

const MoodIndicator = () => {
  const { data: mockNews = [], isLoading } = useNews();
  
  if (isLoading) return <LoadingSkeleton count={1} />;

  const positive = mockNews.filter((n) => n.mood === "Positive").length;
  const total = mockNews.length || 1; // avoid division by 0
  const pct = Math.round((positive / total) * 100);

  const emoji = pct >= 70 ? "😊" : pct >= 40 ? "😐" : "😟";
  const label = pct >= 70 ? "Positive" : pct >= 40 ? "Mixed" : "Negative";

  return (
    <div className="bg-card rounded-xl p-4 shadow-card animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <div>
            <p className="text-xs font-semibold text-foreground">Daily Mood: {label}</p>
            <p className="text-[11px] text-muted-foreground">{pct}% positive news today</p>
          </div>
        </div>
        <span className="text-lg font-bold gradient-text">{pct}%</span>
      </div>
      <Progress value={pct} className="h-2" />
    </div>
  );
};

export default MoodIndicator;
