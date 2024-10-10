type RegisterInputType = {
  rep: number;
  weight: number;
}

export interface IRegisterWorkout_Data {
  nameExercise: string;
  warming: RegisterInputType,
  set: RegisterInputType,
  superSet: RegisterInputType
}

export interface IRegisterWorkout { // pegar valores de treinos e registros relacionados
  idWorkout: string;
  workoutName: string;
  data: IRegisterWorkout_Data[];
  date: string;
  comment?: string;
}