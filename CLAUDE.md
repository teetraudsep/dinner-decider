# Dinner Decider

## Product
For busy parents who don't know what to cook tonight.

**Core flow:** user photographs fridge/pantry (several photos) → Claude detects
ingredients → user confirms the list → Claude picks ONE dinner that fits the
household profile.

**Principle:** keep it extremely simple. Big buttons, big text, minimal choices.
When in doubt, remove an option rather than add one.

## Stack
- Expo (React Native, TypeScript, Expo Router)
- Supabase: auth, database, storage (photos), Edge Functions
- Claude API is called ONLY from a Supabase Edge Function.
  **Never put the Anthropic API key in the app**: no `EXPO_PUBLIC_*` vars, no
  hardcoded keys. The key lives only in Supabase Edge Function secrets.
- Target: iOS first, shipped via TestFlight using EAS Build.

## Screens
Home, Capture, Confirm Ingredients, Suggestion, Cooking, Profile,
Weekly Planner (premium: visible but locked for free users).

## Household profile
Household size, picky eaters, allergies, weeknight cooking time, spice level,
favorite cuisines, comfort vs adventurous.

Allergies are a hard constraint: a suggestion must never include them.

## Tiers
- Free: 3 dinner decisions per week (enforce on the server, not just in the app).
- Premium: unlimited decisions + Weekly Planner + shopping list.
- Payments come later, via Apple in-app subscriptions. Don't build payments yet.

## Working with me
I'm a beginner building my first iOS app. Explain each command before running it,
and ask before installing anything.

## Expo conventions
Follow the Expo guidance in AGENTS.md:
@AGENTS.md
