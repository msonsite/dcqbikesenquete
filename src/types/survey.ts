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
  /** Vraag 1: heeft de klant dcqbikes.be bekeken vóór het bezoek? */
  visitedWebsite: boolean | null;
  /** Vraag 2a (indien bekeken): rol van de website (decisive/helped/no_influence) */
  websiteInfluence: string | null;
  /** Vraag 2b (indien niet bekeken): via welk kanaal gevonden */
  source: string | null;
}
