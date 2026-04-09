export type NewsCategory = "Tech" | "Sports" | "Politics" | "Business" | "Health";

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: NewsCategory;
  image: string;
  date: string;
  bias: "Neutral" | "Slight Bias" | "High Bias";
  mood: "Positive" | "Neutral" | "Negative";
  confidence: number;
  isBreaking?: boolean;
  relatedTo?: string; // id of article this is "because you read" related to
}

