import { router } from 'expo-router';
import { useState } from 'react';

import { BigButton } from '@/components/big-button';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { placeholderDinner } from '@/data/placeholder';

/** One step at a time, huge text: readable from across the kitchen. */
export default function CookingScreen() {
  const { steps } = placeholderDinner;
  const [step, setStep] = useState(0);
  const isLast = step === steps.length - 1;

  return (
    <Screen
      footer={
        <>
          <BigButton
            label={isLast ? 'Done! 🎉' : 'Next step'}
            onPress={() => (isLast ? router.dismissAll() : setStep(step + 1))}
          />
          {step > 0 && (
            <BigButton label="Previous step" variant="secondary" onPress={() => setStep(step - 1)} />
          )}
        </>
      }>
      <ThemedText type="large" themeColor="textSecondary">
        Step {step + 1} of {steps.length}
      </ThemedText>
      <ThemedText type="title">{steps[step]}</ThemedText>
    </Screen>
  );
}
