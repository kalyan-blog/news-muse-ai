import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { NewsCategory } from "@/data/mockNews";

type ReadingMode = "Quick" | "Normal" | "Detailed";

interface AppState {
  interests: NewsCategory[];
  readingMode: ReadingMode;
  darkMode: boolean;
  notifications: boolean;
  quickRead: boolean;
  savedArticles: string[];
  readArticles: string[];
  toggleInterest: (interest: NewsCategory) => void;
  setReadingMode: (mode: ReadingMode) => void;
  toggleDarkMode: () => void;
  toggleNotifications: () => void;
  toggleQuickRead: () => void;
  toggleSaveArticle: (id: string) => void;
  markAsRead: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [interests, setInterests] = useState<NewsCategory[]>(["Tech", "Business"]);
  const [readingMode, setReadingMode] = useState<ReadingMode>("Normal");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [quickRead, setQuickRead] = useState(false);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [readArticles, setReadArticles] = useState<string[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleInterest = (interest: NewsCategory) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleSaveArticle = (id: string) => {
    setSavedArticles((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const markAsRead = (id: string) => {
    setReadArticles((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <AppContext.Provider
      value={{
        interests,
        readingMode,
        darkMode,
        notifications,
        quickRead,
        savedArticles,
        readArticles,
        toggleInterest,
        setReadingMode,
        toggleDarkMode: () => setDarkMode((p) => !p),
        toggleNotifications: () => setNotifications((p) => !p),
        toggleQuickRead: () => setQuickRead((p) => !p),
        toggleSaveArticle,
        markAsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
