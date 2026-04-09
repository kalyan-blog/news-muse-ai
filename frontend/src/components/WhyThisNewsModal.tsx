import { NewsArticle } from "@/data/mockNews";
import { useApp } from "@/context/AppContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle, Star, History, TrendingUp } from "lucide-react";

interface Props {
  article: NewsArticle;
}

const WhyThisNewsModal = ({ article }: Props) => {
  const { interests, readArticles } = useApp();
  const matchesInterest = interests.includes(article.category);
  const wasRead = readArticles.some((id) => id === article.relatedTo);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="text-[11px] text-primary hover:underline flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <HelpCircle size={12} />
          Why this?
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-sm" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-base">Why you're seeing this</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 pt-2">
          {matchesInterest && (
            <div className="flex items-start gap-3">
              <Star size={16} className="text-warning mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Matches your interests</p>
                <p className="text-xs text-muted-foreground">You follow <strong>{article.category}</strong> news</p>
              </div>
            </div>
          )}
          {wasRead && (
            <div className="flex items-start gap-3">
              <History size={16} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Based on reading history</p>
                <p className="text-xs text-muted-foreground">Related to articles you've read before</p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3">
            <TrendingUp size={16} className="text-success mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Trending topic</p>
              <p className="text-xs text-muted-foreground">This story is gaining traction today</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhyThisNewsModal;
