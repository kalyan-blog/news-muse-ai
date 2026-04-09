import { NewsArticle } from "@/data/mockNews";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { Bookmark, BookmarkCheck, Volume2, Baby, ShieldCheck, Shield, ShieldAlert, Eye } from "lucide-react";
import WhyThisNewsModal from "./WhyThisNewsModal";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewsCardProps {
  article: NewsArticle;
  compact?: boolean;
}

const NewsCard = ({ article, compact }: NewsCardProps) => {
  const { quickRead, savedArticles, toggleSaveArticle, markAsRead } = useApp();
  const navigate = useNavigate();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const isSaved = savedArticles.includes(article.id);

  const biasColor =
    article.bias === "Neutral"
      ? "text-success"
      : article.bias === "Slight Bias"
      ? "text-warning"
      : "text-destructive";

  const BiasIcon =
    article.bias === "Neutral" ? ShieldCheck : article.bias === "Slight Bias" ? Shield : ShieldAlert;

  const handleClick = () => {
    markAsRead(article.id);
    navigate(`/news/${article.id}`);
  };

  return (
    <>
      <div
        className="news-card cursor-pointer animate-fade-in group"
        onClick={handleClick}
      >
        <div className={`relative overflow-hidden ${compact ? "h-32" : "h-40"}`}>
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Top badges */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            {article.isBreaking && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-destructive text-destructive-foreground animate-pulse">
                BREAKING
              </span>
            )}
            <span className="chip chip-active text-[10px] py-0.5 px-2">{article.category}</span>
          </div>
          <div className="absolute top-2 right-2 flex gap-1.5">
            <span
              className={`rounded-full text-[10px] px-1.5 py-0.5 ${
                article.mood === "Positive"
                  ? "bg-success text-success-foreground"
                  : article.mood === "Negative"
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {article.mood === "Positive" ? "😊" : article.mood === "Negative" ? "😟" : "😐"}
            </span>
          </div>
          {/* Confidence badge */}
          <div className="absolute bottom-2 right-2">
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-card/80 backdrop-blur-sm text-foreground font-medium">
              {article.confidence}% Reliable
            </span>
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-card-foreground line-clamp-2 mb-1 text-sm leading-snug">
            {article.title}
          </h3>
          {!quickRead && (
            <p className="text-muted-foreground text-xs line-clamp-2 mb-2">{article.summary}</p>
          )}

          {/* Bias + date row */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] text-muted-foreground">{article.date}</span>
            <div className={`flex items-center gap-0.5 ${biasColor}`}>
              <BiasIcon size={11} />
              <span className="text-[10px] font-medium">{article.bias}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between gap-1">
            <div className="flex gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); setQuickViewOpen(true); }}
                className="text-[11px] px-2 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors flex items-center gap-1"
              >
                <Eye size={11} /> Quick View
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); toggleSaveArticle(article.id); }}
                className="p-1 rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
              >
                {isSaved ? <BookmarkCheck size={13} className="text-primary" /> : <Bookmark size={13} />}
              </button>
            </div>
            <WhyThisNewsModal article={article} />
          </div>
        </div>
      </div>

      {/* Quick View Dialog */}
      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base leading-snug">{article.title}</DialogTitle>
          </DialogHeader>
          <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded-lg" />
          <p className="text-sm text-foreground leading-relaxed">{article.summary}</p>
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => { setQuickViewOpen(false); handleClick(); }}
              className="chip chip-active text-xs"
            >
              Read Full Article →
            </button>
            <button className="chip chip-inactive text-xs flex items-center gap-1">
              <Volume2 size={12} /> Listen
            </button>
            <button className="chip chip-inactive text-xs flex items-center gap-1">
              <Baby size={12} /> ELI10
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewsCard;
