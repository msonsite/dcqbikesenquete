-- Meet de concrete invloed van dcqbikes.be op een aankoop.
-- Voer dit eenmalig uit in de Supabase SQL Editor voor bestaande databases.

ALTER TABLE public.survey_answers
  ADD COLUMN IF NOT EXISTS website_influence TEXT;

ALTER TABLE public.survey_answers
  DROP CONSTRAINT IF EXISTS survey_answers_website_influence_check;

ALTER TABLE public.survey_answers
  ADD CONSTRAINT survey_answers_website_influence_check
  CHECK (
    website_influence IS NULL OR website_influence IN (
      'decisive',
      'helped',
      'no_influence',
      'not_visited'
    )
  );

COMMENT ON COLUMN public.survey_answers.website_influence IS
  'Rol van dcqbikes.be: decisive, helped, no_influence of not_visited';
