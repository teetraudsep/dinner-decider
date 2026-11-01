import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, processLock } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

/**
 * The one Supabase client for the whole app.
 *
 * The URL and publishable key come from `.env` (not committed to Git).
 * The publishable key is designed to ship inside apps: row-level security in the
 * database decides what each user can see. The Anthropic API key must NEVER be here.
 */
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error(
    'Supabase settings are missing. Copy .env.example to .env, fill in your project URL ' +
      'and publishable key, then restart with `npx expo start --clear`.',
  );
}

export const supabase = createClient(url, publishableKey, {
  auth: {
    storage: AsyncStorage, // keeps you signed in after the app closes
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
});

// Refresh the login token only while the app is on screen.
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });
}
