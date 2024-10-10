import { useUser } from "@/hooks";
import { IRegisterWorkout } from "@/interfaces/IRegisterWorkout";
import { registerWorkoutStorage } from "@/localStorage";
import { db } from "@/services/firebaseService";
import { ref, update } from "firebase/database";
import { createContext, useEffect, useState } from "react";

interface IRegisterWorkoutContext {
  registerWorkout: IRegisterWorkout[];
  setRegisterWorkout: React.Dispatch<React.SetStateAction<IRegisterWorkout[]>>;
}

export const RegisterWorkoutContext = createContext<IRegisterWorkoutContext>({} as IRegisterWorkoutContext);

export const RegisterWorkoutProvider = ({children}:{children: React.ReactNode}) => {
  const [registerWorkout, setRegisterWorkout] = useState<IRegisterWorkout[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const getWorkouts = async () => {
      const RegisterWorkouts = await registerWorkoutStorage.get()
      setRegisterWorkout(RegisterWorkouts.reverse());
    }
    getWorkouts();
  }, []);

  useEffect(() => {
    const asyncRegisterWorkoutData = async () => {
      await registerWorkoutStorage.set(registerWorkout);
      if (user.userId !== null && user.userId !== 'noAccount') {
        await update(ref(db, 'users/' + user.userId), {
          registerWorkouts: JSON.stringify(registerWorkout),
        });
      }
    }
    asyncRegisterWorkoutData();
  }, [registerWorkout])

  return (
    <RegisterWorkoutContext.Provider value={{registerWorkout, setRegisterWorkout}}>
      {children}
    </RegisterWorkoutContext.Provider>
  )
}