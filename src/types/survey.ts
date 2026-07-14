export interface SurveyAnswer {
  id: string;
  created_at: string;
  source: string;
  visited_website: boolean;
  purchase_reason: string | null;
}

export interface SurveyFormData {
  source: string | null;
  visitedWebsite: boolean | null;
  purchaseReason: string | null;
}

export interface DashboardStats {
  total: number;
  today: number;
  thisMonth: number;
  sourcePercentages: { name: string; value: number; count: number }[];
  websitePercentages: { name: string; value: number; count: number }[];
  monthlyData: { month: string; count: number }[];
  weeklyData: { week: string; count: number }[];
}
