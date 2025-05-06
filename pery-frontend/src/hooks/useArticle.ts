import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface ArticleIntro {
  articleName: string;
  scrapeDate: number;
  introduction: string;
}

async function fetchArticleIntro(articleName: string, token?: string, language?: string): Promise<ArticleIntro> {
  const headers: Record<string, string> = {};
  if (token) headers["x-authentication"] = token;
  if (language) headers["Accept-Language"] = language;

  const response = await axios.get(`/introduction/${encodeURIComponent(articleName)}`, { headers });
  return response.data;
}

export function useArticle(articleName: string, token?: string, language?: string) {
  return useQuery({
    queryKey: ["article", language ?? "en", articleName],
    queryFn: () => fetchArticleIntro(articleName, token, language),
    staleTime: 5 * 60 * 1000,
    enabled: !!articleName,
  });
}
