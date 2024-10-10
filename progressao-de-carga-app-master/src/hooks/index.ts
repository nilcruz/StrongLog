import { ThemeContext } from '@/context/themeContext';
import { WorkoutContext } from '@/context/workoutContext';
import { RegisterWorkoutContext } from '@/context/RegisterWorkoutContext';

import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
}

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  return context;
}

export const useRegisterWorkout = () => {
  const context = useContext(RegisterWorkoutContext);
  return context;
}

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
}