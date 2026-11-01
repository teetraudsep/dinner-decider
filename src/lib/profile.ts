import { supabase } from '@/lib/supabase';

/** The household profile, as the app uses it. Mirrors the `profiles` table. */
export type Profile = {
  householdSize: number;
  pickyEaters: string;
  /** Hard constraint: a suggestion must never include these. */
  allergies: string[];
  weeknightMinutes: 15 | 30 | 45 | 60;
  spiceLevel: 'mild' | 'medium' | 'hot';
  favoriteCuisines: string[];
  /** 0 = comfort food only … 4 = very adventurous */
  adventurousness: number;
};

/** A row of the `profiles` table (see supabase/migrations). */
type ProfileRow = {
  household_size: number;
  picky_eaters: string;
  allergies: string[];
  weeknight_minutes: Profile['weeknightMinutes'];
  spice_level: Profile['spiceLevel'];
  favorite_cuisines: string[];
  adventurousness: number;
};

export const DEFAULT_PROFILE: Profile = {
  householdSize: 2,
  pickyEaters: '',
  allergies: [],
  weeknightMinutes: 30,
  spiceLevel: 'mild',
  favoriteCuisines: [],
  adventurousness: 1,
};

const COLUMNS =
  'household_size, picky_eaters, allergies, weeknight_minutes, spice_level, favorite_cuisines, adventurousness';

/** Load the signed-in user's profile. Row-level security only returns their own row. */
export async function loadProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .select(COLUMNS)
    .eq('id', userId)
    .maybeSingle<ProfileRow>();

  if (error) throw error;
  if (!data) return DEFAULT_PROFILE;

  return {
    householdSize: data.household_size,
    pickyEaters: data.picky_eaters,
    allergies: data.allergies,
    weeknightMinutes: data.weeknight_minutes,
    spiceLevel: data.spice_level,
    favoriteCuisines: data.favorite_cuisines,
    adventurousness: data.adventurousness,
  };
}

/** Save the profile (creates the row if it doesn't exist yet). */
export async function saveProfile(userId: string, profile: Profile): Promise<void> {
  const row: ProfileRow & { id: string } = {
    id: userId,
    household_size: profile.householdSize,
    picky_eaters: profile.pickyEaters.trim(),
    allergies: profile.allergies,
    weeknight_minutes: profile.weeknightMinutes,
    spice_level: profile.spiceLevel,
    favorite_cuisines: profile.favoriteCuisines,
    adventurousness: profile.adventurousness,
  };
  const { error } = await supabase.from('profiles').upsert(row);
  if (error) throw error;
}

/** "Nuts, shellfish" → ["Nuts", "shellfish"] */
export function parseList(text: string): string[] {
  const seen = new Set<string>();
  return text
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s && !seen.has(s.toLowerCase()) && seen.add(s.toLowerCase()));
}
