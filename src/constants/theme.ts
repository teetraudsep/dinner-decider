/**
 * Design tokens, copied from the "Dinner Decider — App Screens" design canvas.
 * Change colors here, never in screens.
 */

import '@/global.css';

export const Colors = {
  light: {
    bg: '#F3F5EF',
    surface: '#FFFFFF',
    ink: '#1B2620',
    ink2: '#3E4B43',
    ink3: '#56645B',
    body: '#2B3830',
    line: '#DDE2D8',
    line2: '#D5DBD0',
    line3: '#C9D1C5',
    divider: '#ECEFE8',
    dashed: '#A8B3A6',
    strong: '#1B2620',
    onStrong: '#FFFFFF',
    green: '#2F5D46',
    badge: '#2F5D46',
    chip: '#E3EDE6',
    chipText: '#1F4232',
    alertBg: '#FBE7DF',
    alertLine: '#EFC3B2',
    alertText: '#8E2E14',
    avoidBg: '#F1E6D6',
    avoidText: '#6A4410',
    maybeBg: '#FCE9C8',
    maybeText: '#7A4A00',
    dishBg: '#E6D9C6',
    dishText: '#6B5A42',
    accent: '#C8461F',
    onAccent: '#FFFFFF',
    allergy: '#8E2E14',
    star: '#E39A3B',
    starLine: '#B5651D',
  },
  dark: {
    bg: '#121815',
    surface: '#1C2420',
    ink: '#E8EEE9',
    ink2: '#B4C0B8',
    ink3: '#9AA79F',
    body: '#CFD8D2',
    line: '#2E3A33',
    line2: '#33403A',
    line3: '#46544C',
    divider: '#26302B',
    dashed: '#5B6A60',
    strong: '#E8EEE9',
    onStrong: '#121815',
    green: '#8CC7A6',
    badge: '#3B7357',
    chip: '#22382C',
    chipText: '#A9D6BB',
    alertBg: '#3A2219',
    alertLine: '#6B3524',
    alertText: '#F2A88C',
    avoidBg: '#3A2F1F',
    avoidText: '#E8C48E',
    maybeBg: '#3D3018',
    maybeText: '#F0C877',
    dishBg: '#2E2A22',
    dishText: '#C7B79A',
    accent: '#C8461F',
    onAccent: '#FFFFFF',
    allergy: '#8E2E14',
    star: '#E39A3B',
    starLine: '#B5651D',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light;
export type Theme = { [K in ThemeColor]: string };

/** The camera screen is always dark, whatever the phone's setting. */
export const CameraColors = {
  bg: '#141A16',
  panel: '#26302A',
  dashed: '#5B6A60',
  text: '#FFFFFF',
  muted: '#C9D3CC',
  faint: '#A9B5AD',
  thumbFridge: '#3A4A40',
  thumbPantry: '#4A4436',
} as const;

/**
 * Fonts. The design uses Bricolage Grotesque (headings) and DM Sans (text).
 * Until those font packages are installed, both fall back to the iPhone system font.
 */
export const FontFamily = {
  display: undefined as string | undefined,
  body: undefined as string | undefined,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

/** Side padding of every screen. */
export const ScreenPadding = 24;
