import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Volume2, Lightbulb, Baby, ShieldCheck, ShieldAlert, Shield, Bookmark, BookmarkCheck } from "lucide-react";
import { useNewsArticle } from "@/api";
import { useApp } from "@/context/AppContext";
import { useState, useEffect } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { readingMode, savedArticles, toggleSaveArticle, markAsRead } = useApp();
  const [simplified, setSimplified] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const { data: article, isLoading } = useNewsArticle(id);

  useEffect(() => {
    if (article) markAsRead(article.id);
  }, [article?.id]);

  if (isLoading) return <div className="p-8"><LoadingSkeleton count={3} /></div>;
  if (!article) return <div className="p-8 text-center text-muted-foreground">Article not found</div>;

  const isSaved = savedArticles.includes(article.id);

  const biasIcon =
    article.bias === "Neutral" ? ShieldCheck : article.bias === "Slight Bias" ? Shield : ShieldAlert;
  const biasColor =
    article.bias === "Neutral" ? "text-success" : article.bias === "Slight Bias" ? "text-warning" : "text-destructive";
  const BiasIcon = biasIcon;

  const displayContent = simplified
    ? article.content
        .split("\n\n")
        .filter(Boolean)
        .map((p) => "• " + p.split(".")[0] + ".")
        .join("\n")
    : readingMode === "Quick"
    ? article.content.split("\n\n")[0]
    : readingMode === "Detailed" || showFull
    ? article.content
    : article.content.split("\n\n").slice(0, 2).join("\n\n");

  return (
    <div className="max-w-2xl mx-auto pb-8">
      {/* Header Image */}
      <div className="relative">
        <img src={article.image} alt={article.title} className="w-full h-56 object-cover" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm rounded-full p-2 shadow-card"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <button
          onClick={() => toggleSaveArticle(article.id)}
          className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm rounded-full p-2 shadow-card"
        >
          {isSaved ? <BookmarkCheck size={20} className="text-primary" /> : <Bookmark size={20} className="text-foreground" />}
        </button>
        {article.isBreaking && (
          <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full text-xs font-bold bg-destructive text-destructive-foreground animate-pulse">
            BREAKING NEWS
          </span>
        )}
      </div>

      <div className="px-4 pt-4 space-y-4 animate-fade-in">
        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="chip chip-active text-xs">{article.category}</span>
          <span className="text-xs text-muted-foreground">{article.date}</span>
          <div className={`flex items-center gap-1 ${biasColor}`}>
            <BiasIcon size={14} />
            <span className="text-xs font-medium">{article.bias}</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
            {article.confidence}% Reliable
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-foreground leading-tight">{article.title}</h1>

        {/* Summary bullets */}
        <div className="bg-secondary/50 rounded-xl p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Key Points</p>
          {article.summary.split(". ").map((point, i) => (
            <p key={i} className="text-sm text-foreground flex items-start gap-2 mb-1">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full gradient-primary shrink-0" />
              {point.replace(/\.$/, "")}.
            </p>
          ))}
        </div>

        {/* Content */}
        <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
          {displayContent}
        </div>

        {readingMode === "Normal" && !showFull && !simplified && (
          <button onClick={() => setShowFull(true)} className="text-sm text-primary font-medium">
            Read full article →
          </button>
        )}

        {/* Actions */}
        <div className="flex gap-2 flex-wrap pt-2">
          <button
            onClick={() => setSimplified(!simplified)}
            className={`flex items-center gap-2 chip ${simplified ? "chip-active" : "chip-inactive"}`}
          >
            <Lightbulb size={14} />
            Explain Simply
          </button>
          <button className="flex items-center gap-2 chip chip-inactive">
            <Baby size={14} />
            Explain Like I'm 10
          </button>
          <button className="flex items-center gap-2 chip chip-inactive">
            <Volume2 size={14} />
            🔊 Listen
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
