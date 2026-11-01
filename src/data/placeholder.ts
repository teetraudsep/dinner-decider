/**
 * FAKE DATA so the screens can be clicked through before the backend exists.
 * Everything here will be replaced by real data from Supabase and the
 * `decide-dinner` Edge Function. Do not build features on top of it.
 */

export const placeholderIngredients = [
  'Chicken thighs',
  'Rice',
  'Broccoli',
  'Carrots',
  'Eggs',
  'Soy sauce',
  'Garlic',
  'Cheddar cheese',
];

export const placeholderDinner = {
  name: 'Chicken & Veggie Fried Rice',
  minutes: 25,
  why: 'Uses what you have, mild for picky eaters, ready in under 30 minutes.',
  steps: [
    'Cook the rice (or use leftover rice).',
    'Cut chicken into small pieces. Fry in a hot pan with a little oil for 6–7 minutes.',
    'Add chopped broccoli, carrots and garlic. Cook 4 minutes.',
    'Push everything aside, scramble 2 eggs in the pan.',
    'Add rice and 2 tablespoons soy sauce. Stir-fry 3 minutes. Serve.',
  ],
};

export const placeholderProfile = [
  { label: 'Household size', value: '4 people' },
  { label: 'Picky eaters', value: '1 child' },
  { label: 'Allergies', value: 'Peanuts' },
  { label: 'Weeknight cooking time', value: '30 minutes' },
  { label: 'Spice level', value: 'Mild' },
  { label: 'Favorite cuisines', value: 'Italian, Asian' },
  { label: 'Comfort or adventurous', value: 'Mostly comfort' },
];

export const placeholderDecisionsLeft = 3;
