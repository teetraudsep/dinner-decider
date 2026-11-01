/**
 * FAKE DATA (copied from the design canvas) so the screens can be clicked through
 * before the backend exists. It will be replaced by real data from Supabase and
 * the `decide-dinner` Edge Function. Do not build features on top of it.
 */

export const FREE_DECISIONS_PER_WEEK = 3;
export const placeholderDecisionsLeft = 2;

export type Ingredient = { name: string; qty: string; maybe?: boolean };

export const placeholderIngredients: Ingredient[] = [
  { name: 'Chicken thighs', qty: '~500 g' },
  { name: 'Broccoli', qty: '1 head' },
  { name: 'Lemon', qty: '1' },
  { name: 'Cheddar', qty: 'half block' },
  { name: 'Eggs', qty: '6' },
  { name: 'Cherry tomatoes', qty: 'a handful' },
  { name: 'Cream', qty: 'small carton', maybe: true },
  { name: 'Pasta', qty: '1 pack' },
];

export type Dinner = {
  name: string;
  shortName: string;
  minutes: number;
  serves: number;
  spice: string;
  why: string;
  toBuy: string;
  uses: string;
  steps: string[];
};

export const placeholderDinners: Dinner[] = [
  {
    name: 'Lemon chicken with roasted broccoli',
    shortName: 'Lemon chicken',
    minutes: 25,
    serves: 4,
    spice: 'Mild',
    why: 'Uses the chicken and broccoli you already have, fits your 30-minute weeknight, and the kids can skip the lemon.',
    toBuy: 'Nothing to buy.',
    uses: '600 g chicken thighs · 1 broccoli · 1 lemon · 2 tbsp oil · salt, pepper',
    steps: [
      'Heat oven to 220°C. Cut broccoli into florets.',
      'Toss chicken and broccoli with oil, salt, pepper and lemon zest on one tray.',
      'Roast 20 minutes, until the chicken is golden.',
      'Squeeze lemon over the adults’ portions and serve.',
    ],
  },
  {
    name: 'Creamy tomato pasta with cheddar',
    shortName: 'Tomato pasta',
    minutes: 20,
    serves: 4,
    spice: 'Mild',
    why: 'Pasta, cherry tomatoes and cheddar are all in your kitchen, and it is a sure win with picky eaters.',
    toBuy: 'Nothing to buy.',
    uses: '1 pack pasta · cherry tomatoes · cream · cheddar · salt',
    steps: [
      'Boil salted water and cook the pasta.',
      'Halve the tomatoes and soften them in a pan with a little oil for 5 minutes.',
      'Stir in the cream and a handful of grated cheddar.',
      'Drain the pasta, toss it in the sauce and serve.',
    ],
  },
];

export type Meal = { dish: string; when: string; stars: number; note?: string };

export const placeholderHistory: Meal[] = [
  { dish: 'Creamy tomato pasta', when: 'Wed', stars: 5, note: 'Kids asked for seconds' },
  { dish: 'Salmon and potatoes', when: 'Tue', stars: 4 },
  { dish: 'Veggie stir-fry', when: 'Mon', stars: 2, note: 'Too spicy for Karl' },
  { dish: 'Omelette and salad', when: 'Sun', stars: 3 },
];

export type FamilyMember = {
  initial: string;
  name: string;
  age: string;
  tint: string;
  eating: boolean;
  likes: string[];
  avoid: string[];
  allergy?: string;
};

export const placeholderFamily: FamilyMember[] = [
  {
    initial: 'D',
    name: 'Dad',
    age: 'Adult',
    tint: '#F6D3C4',
    eating: true,
    likes: ['spicy', 'fish'],
    avoid: [],
  },
  {
    initial: 'M',
    name: 'Mom',
    age: 'Adult',
    tint: '#D7E6DC',
    eating: true,
    likes: ['Asian'],
    avoid: ['pork'],
  },
  {
    initial: 'E',
    name: 'Emma',
    age: 'Child, 9',
    tint: '#F4E3B8',
    eating: true,
    likes: ['pasta'],
    avoid: ['mushrooms'],
    allergy: 'nuts',
  },
  {
    initial: 'K',
    name: 'Karl',
    age: 'Child, 5',
    tint: '#D6DFF0',
    eating: false,
    likes: ['chicken'],
    avoid: ['spicy'],
  },
];

export const placeholderWeek = [
  { day: 'MON', dish: 'Chicken fried rice' },
  { day: 'TUE', dish: 'Spinach and feta pasta' },
  { day: 'WED', dish: 'Fish tacos' },
  { day: 'THU', dish: 'Leftover rice bowls' },
  { day: 'FRI', dish: 'Homemade pizza' },
];
