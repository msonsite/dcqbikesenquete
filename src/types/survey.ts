export interface SurveyAnswer {
  id: string;
  created_at: string;
  customer_type: string | null;
  source: string | null;
  visited_website: boolean;
  website_influence: string | null;
  purchase_reason: string | null;
}

export interface SurveyFormData {
  customerType: string | null;
  source: string | null;
  websiteInfluence: string | null;
}
