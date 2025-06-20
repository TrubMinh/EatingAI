import { useRouter } from 'expo-router';
import { useOnboarding } from '../src/hooks/useOnboarding';
import OnboardingScreen from '../src/components/onboarding/OnboardingScreen';
import GenderScreen from '../src/components/onboarding/GenderScreen';
import AgeScreen from '../src/components/onboarding/AgeScreen';
import HeightScreen from '../src/components/onboarding/HeightScreen';
import WeightScreen from '../src/components/onboarding/WeightScreen';
import TargetWeightScreen from '../src/components/onboarding/TargetWeightScreen';
import GoalsScreen from '../src/components/onboarding/GoalsScreen';
import EventDateScreen from '../src/components/onboarding/EventDateScreen';
import ActivityLevelScreen from '../src/components/onboarding/ActivityLevelScreen';
import WeightLossSpeedScreen from '../src/components/onboarding/WeightLossSpeedScreen';
import HealthConditionScreen from '../src/components/onboarding/HealthConditionScreen';
import NameScreen from '../src/components/onboarding/NameScreen';
import OnboardingSummaryScreen from '../src/components/onboarding/OnboardingSummaryScreen';
import LoginScreen from '../src/components/LoginScreen';

export default function Onboarding() {
  const router = useRouter();
  const { step, setStep, data, updateData, bmr, tdee, activityFactor } = useOnboarding();

  switch (step) {
    case 'onboarding':
      return (
        <OnboardingScreen
          onContinue={() => setStep('gender')}
          onLogin={() => setStep('login')}
          onSync={() => {}}
        />
      );
    case 'login':
      return (
        <LoginScreen
          onBack={() => setStep('onboarding')}
          onSuccess={user => {
            updateData({ uid: user.uid });
            setStep('gender');
          }}
        />
      );
    case 'gender':
      return (
        <GenderScreen
          onBack={() => setStep('onboarding')}
          onContinue={gender => { updateData({ gender }); setStep('age'); }}
        />
      );
    case 'age':
      return (
        <AgeScreen
          onBack={() => setStep('gender')}
          onContinue={age => { updateData({ age }); setStep('height'); }}
        />
      );
    case 'height':
      return (
        <HeightScreen
          onBack={() => setStep('age')}
          onContinue={(height, heightUnit) => { updateData({ height, heightUnit }); setStep('weight'); }}
          gender={data.gender ?? 'male'}
        />
      );
    case 'weight':
      return (
        <WeightScreen
          onBack={() => setStep('height')}
          onContinue={(weight, weightUnit) => { updateData({ weight, weightUnit }); setStep('goals'); }}
          heightCm={data.height ?? 170}
        />
      );
    case 'goals':
      return (
        <GoalsScreen
          onBack={() => setStep('weight')}
          onContinue={goal => { updateData({ goal }); setStep('targetWeight'); }}
        />
      );
    case 'targetWeight':
      return (
        <TargetWeightScreen
          onBack={() => setStep('goals')}
          onContinue={(targetWeight, targetWeightUnit) => { updateData({ targetWeight, targetWeightUnit }); setStep('eventDate'); }}
          currentWeight={data.weight ?? 70}
          heightCm={data.height ?? 170}
          goal={data.goal ?? 'loseWeight'}
        />
      );
    case 'eventDate':
      return (
        <EventDateScreen
          onBack={() => setStep('targetWeight')}
          onContinue={eventDate => { updateData({ eventDate }); setStep('activityLevel'); }}
        />
      );
    case 'activityLevel':
      return (
        <ActivityLevelScreen
          onBack={() => setStep('eventDate')}
          onContinue={activityLevel => { updateData({ activityLevel }); setStep('weightLossSpeed'); }}
          bmr={bmr}
          activityFactor={activityFactor}
          tdee={tdee}
        />
      );
    case 'weightLossSpeed':
      return (
        <WeightLossSpeedScreen
          onBack={() => setStep('activityLevel')}
          onContinue={weightLossSpeed => { updateData({ weightLossSpeed }); setStep('healthCondition'); }}
          currentWeight={data.weight ?? 70}
          targetWeight={data.targetWeight ?? 65}
          tdee={tdee}
        />
      );
    case 'healthCondition':
      return (
        <HealthConditionScreen
          onBack={() => setStep('weightLossSpeed')}
          onContinue={healthCondition => { updateData({ healthCondition }); setStep('name'); }}
        />
      );
    case 'name':
      return (
        <NameScreen
          onBack={() => setStep('healthCondition')}
          onContinue={name => { updateData({ name }); setStep('summary'); }}
        />
      );
    case 'summary':
      return (
        <OnboardingSummaryScreen
          data={data}
          onStart={() => router.replace('/main' as any)}
        />
      );
    default:
      return null;
  }
} 