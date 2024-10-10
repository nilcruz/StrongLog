import { useUser } from "@/hooks";
import { IWorkout } from "@/interfaces/IWorkout";
import { workoutStorage } from "@/localStorage";
import { db } from "@/services/firebaseService";
import { ref, set, update } from "firebase/database";
import { createContext, useEffect, useState } from "react";

interface IWorkoutContext {
  workout: IWorkout[];
  setWorkout: React.Dispatch<React.SetStateAction<IWorkout[]>>;
}

export const WorkoutContext = createContext<IWorkoutContext>({} as IWorkoutContext);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [workout, setWorkout] = useState<IWorkout[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const getWorkouts = async () => {
      const workouts = await workoutStorage.get()
      setWorkout(workouts.reverse());
    }
    getWorkouts();
  }, []);

  useEffect(() => {
    const asyncWorkoutData = async () => {
      if (user.userId !== null && user.userId !== 'noAccount') {
        await workoutStorage.set(workout);
        await update(ref(db, 'users/' + user.userId), {
          workouts: JSON.stringify(workout),
        });
      }
    }

    asyncWorkoutData();
  }, [workout])

  return (
    <WorkoutContext.Provider value={{ workout, setWorkout }}>
      {children}
    </WorkoutContext.Provider>
  )
}