export interface IExercises {
  id: string;
  name: string;
}

export interface IWorkout {
  id:string;
  nameWorkout: string;
  exercises: IExercises[]
  comment: string;
}