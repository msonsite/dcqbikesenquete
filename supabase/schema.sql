-- ============================================================
-- DCQ Bikes enquête — volledig databaseschema
-- Voer dit ÉÉN keer uit in de Supabase SQL Editor.
-- Idempotent: veilig om opnieuw uit te voeren.
-- ============================================================

-- 1. Tabel (maakt aan indien nog niet bestaat)
CREATE TABLE IF NOT EXISTS public.survey_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  customer_type TEXT,
  source TEXT,
  visited_website BOOLEAN NOT NULL DEFAULT false,
  website_influence TEXT,
  purchase_reason TEXT
);

-- 2. Ontbrekende kolommen toevoegen (voor bestaande databases)
ALTER TABLE public.survey_answers
  ADD COLUMN IF NOT EXISTS customer_type TEXT,
  ADD COLUMN IF NOT EXISTS website_influence TEXT;

-- 3. Toegestane waarden afdwingen
ALTER TABLE public.survey_answers
  DROP CONSTRAINT IF EXISTS survey_answers_customer_type_check;
ALTER TABLE public.survey_answers
  ADD CONSTRAINT survey_answers_customer_type_check
  CHECK (customer_type IS NULL OR customer_type IN ('new', 'returning'));

ALTER TABLE public.survey_answers
  DROP CONSTRAINT IF EXISTS survey_answers_website_influence_check;
ALTER TABLE public.survey_answers
  ADD CONSTRAINT survey_answers_website_influence_check
  CHECK (
    website_influence IS NULL OR website_influence IN (
      'decisive', 'helped', 'no_influence', 'not_visited'
    )
  );

-- 4. Index voor snelle dashboard-queries op datum
CREATE INDEX IF NOT EXISTS survey_answers_created_at_idx
  ON public.survey_answers (created_at DESC);

-- 5. Row Level Security
ALTER TABLE public.survey_answers ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.survey_answers TO anon, authenticated;
GRANT SELECT ON public.survey_answers TO authenticated;

-- Kiosk: anonieme inserts toestaan
DROP POLICY IF EXISTS "Allow public insert" ON public.survey_answers;
CREATE POLICY "Allow public insert"
  ON public.survey_answers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Dashboard: enkel ingelogde admins mogen data lezen
DROP POLICY IF EXISTS "Allow authenticated select" ON public.survey_answers;
CREATE POLICY "Allow authenticated select"
  ON public.survey_answers
  FOR SELECT
  TO authenticated
  USING (true);
