-- Fix: grants + RLS policies voor survey_answers
-- Voer uit in Supabase SQL Editor als inserts falen

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.survey_answers TO anon, authenticated;
GRANT SELECT ON public.survey_answers TO authenticated;

ALTER TABLE public.survey_answers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON public.survey_answers;
DROP POLICY IF EXISTS "Allow authenticated select" ON public.survey_answers;

-- Insert voor kiosk (anon + ingelogde users)
CREATE POLICY "Allow public insert"
  ON public.survey_answers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Lezen enkel voor ingelogde admins
CREATE POLICY "Allow authenticated select"
  ON public.survey_answers
  FOR SELECT
  TO authenticated
  USING (true);
