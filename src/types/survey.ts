export interface SurveyAnswer {
  id: string;
  created_at: string;
  source: string;
  visited_website: boolean;
  website_influence: string | null;
  purchase_reason: string | null;
}

export interface SurveyFormData {
  source: string | null;
  websiteInfluence: string | null;
}

export interface DashboardStats {
  total: number;
  today: number;
  thisMonth: number;
  websiteVisitedPercentage: number;
  websiteAssistedPercentage: number;
  websiteSourcePercentage: number;
  sourcePercentages: { name: string; value: number; count: number }[];
  websiteInfluencePercentages: { name: string; value: number; count: number }[];
  monthlyData: { month: string; count: number; assisted: number }[];
  weeklyData: { week: string; count: number; assisted: number }[];
}
