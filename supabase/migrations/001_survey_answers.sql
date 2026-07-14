-- DCQ Bikes enquête: survey_answers tabel met Row Level Security
-- Voer dit script uit in de Supabase SQL Editor of via de CLI.

CREATE TABLE IF NOT EXISTS public.survey_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source TEXT NOT NULL,
  visited_website BOOLEAN NOT NULL,
  purchase_reason TEXT
);

-- Index voor snelle dashboard-queries op datum
CREATE INDEX IF NOT EXISTS survey_answers_created_at_idx
  ON public.survey_answers (created_at DESC);

ALTER TABLE public.survey_answers ENABLE ROW LEVEL SECURITY;

-- Tabelrechten voor anon (kiosk) en authenticated (dashboard)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.survey_answers TO anon, authenticated;
GRANT SELECT ON public.survey_answers TO authenticated;

-- Kiosk: anonieme inserts toestaan (anon key vanuit frontend)
CREATE POLICY "Allow public insert"
  ON public.survey_answers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Dashboard: enkel ingelogde admins mogen data lezen
CREATE POLICY "Allow authenticated select"
  ON public.survey_answers
  FOR SELECT
  TO authenticated
  USING (true);

-- Geen updates of deletes via de frontend
-- (admins kunnen desnoods via Supabase Dashboard beheren)
