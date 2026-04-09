import { useQuery, useMutation } from '@tanstack/react-query';
import { NewsArticle, NewsCategory } from '@/data/mockNews';

export const useNews = (category?: NewsCategory | "All", isBreaking?: boolean) => {
  return useQuery({
    queryKey: ['news', category, isBreaking],
    queryFn: async (): Promise<NewsArticle[]> => {
      const params = new URLSearchParams();
      if (category && category !== "All") params.append('category', category);
      if (isBreaking) params.append('isBreaking', 'true');
      const res = await fetch(`/api/news?${params.toString()}`);
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }
  });
};

export const useNewsArticle = (id: string | undefined) => {
  return useQuery({
    queryKey: ['news', id],
    queryFn: async (): Promise<NewsArticle> => {
      const res = await fetch(`/api/news/${id}`);
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    },
    enabled: !!id
  });
};

export const useSummary = () => {
  return useQuery({
    queryKey: ['summary'],
    queryFn: async (): Promise<string[]> => {
      const res = await fetch('/api/summary');
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }
  });
};

export const useTimeline = () => {
  return useQuery({
    queryKey: ['timeline'],
    queryFn: async (): Promise<any[]> => {
      const res = await fetch('/api/timeline');
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }
  });
};

export const useChat = () => {
  return useMutation({
    mutationFn: async (message: string): Promise<{response: string}> => {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }
  });
};
