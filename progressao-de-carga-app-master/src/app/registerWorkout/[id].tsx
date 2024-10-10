import { CustomButton } from "@/components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";
import { Input, InputProps, ScrollView, Separator, Text, View } from "tamagui";
import { useRegisterWorkout, useTheme, useWorkout } from '@/hooks';
import { useEffect, useState } from "react";
import { IWorkout } from "@/interfaces/IWorkout";
import { IRegisterWorkout, IRegisterWorkout_Data } from "@/interfaces/IRegisterWorkout";
import { getDate } from '@/utils/getDate';
import { router, useLocalSearchParams } from 'expo-router';
import { registerWorkoutStorage } from "@/localStorage";
import { Alert, KeyboardAvoidingView } from "react-native";
import { toastCustom } from "@/utils/toastCustom";

let registerData: IRegisterWorkout_Data[] = [];

export default function RegisterWorkout() {
  const { workout } = useWorkout();
  const [register, setRegister] = useState<IWorkout>({} as IWorkout);
  const { id } = useLocalSearchParams()
  const { setRegisterWorkout } = useRegisterWorkout();
  const { theme } = useTheme();

  useEffect(() => {
    const searchIndex = workout.findIndex(el => el.id == id);
    setRegister(workout[searchIndex]);
  }, []);

  useEffect(() => {
    if (register.exercises !== undefined) {
      if (register.exercises.length > 0) { //preenche o array com os dados de registro do treino
        for (let i = 0; i < register.exercises.length; i++) {
          registerData[i] = {
            nameExercise: register.exercises[i].name,
            warming: { rep: 0, weight: 0 },
            set: { rep: 0, weight: 0 },
            superSet: { rep: 0, weight: 0 },
          }
        };
      }
    }
  }, [register])

  type InputType = 'rep' | 'weight';
  type PhaseType = 'warming' | 'set' | 'superSet';

  const handleRegisterInput =
    (type: InputType, phase: PhaseType, index: number, text: string) => {
      registerData[index][phase][type] = Number(text);
    }

  const handleFormSubmit = () => {
    const finishHandleFormSubmit = async () => {
      const searchIndex = workout.findIndex(el => el.id == id);
      const data: IRegisterWorkout = {
        idWorkout: id as string,
        workoutName: workout[searchIndex].nameWorkout,
        date: getDate(),
        data: registerData,
        comment: workout[searchIndex].comment
      }

      const getRegisterWorkout = await registerWorkoutStorage.get();
      if (getRegisterWorkout) {
        const newData = [...getRegisterWorkout, data];
        await registerWorkoutStorage.set(newData);
        setRegisterWorkout(newData);
        toastCustom('Treino registrado com sucesso', '', 'success');
        router.back();
        return;
      }

      await registerWorkoutStorage.set(data);
      setRegisterWorkout([data]);
      toastCustom('Treino registrado com sucesso', '', 'success');
      router.back();
    }

    Alert.alert('Deseja registrar esse treino ?',
      '',
      [
        {
          text: 'Confirmar',
          style: 'default',
          onPress: finishHandleFormSubmit
        },

        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    );
  }


  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: theme.bg }} behavior="position">

      <ScrollView>
        <View
          w={'100%'}
          height={120}
          alignItems="flex-start"
          justifyContent="center"
        >
          <View
            width={'90%'}
            alignSelf="center"
          >
            <Text fontSize={18} fontWeight={'900'} mb={'$1'} color={theme.textColor}>{register.nameWorkout}</Text>
            <Text fontSize={18} fontWeight={'900'} mb={'$1'} color={theme.textColor}>Observação: {register.comment == '' ? 'N/A' : register.comment}</Text>
            <Text fontSize={18} fontWeight={'900'} color={theme.textColor}>{getDate()}</Text>
          </View>
        </View>
        <Separator bg={'#0A3D3F'} />

        {register.exercises && register.exercises.map((exercise, index) => (
          <View key={index} width={'90%'} alignSelf="center" mt={'$4'}>
            <Text
              color={theme.textColor}
              mb={'$4'}
              fontSize={20}
              fontWeight={'900'}
            >{`${index + 1} - ${exercise.name}`}</Text>

            <View gap={'$3'}>
              <View flexDirection="row" alignItems="center" gap={'$5'}>
                <Text color={theme.textColor} fontSize={16} w={110}>Fase</Text>
                <Text color={theme.textColor} fontSize={16} w={80}>Rep</Text>
                <Text color={theme.textColor} fontSize={16} w={80}>Carga</Text>
              </View>
              <View flexDirection="row" alignItems="center" gap={'$5'}>
                <Text fontSize={16} color={theme.textColor} w={110}>Aquecimento</Text>
                <CustomInput onChangeText={(text) => handleRegisterInput('rep', 'warming', index, text)} />
                <CustomInput onChangeText={(text) => handleRegisterInput('weight', 'warming', index, text)} />
              </View>

              <View flexDirection="row" alignItems="center" gap={'$5'}>
                <Text color={theme.textColor} fontSize={16} w={110}>Set</Text>
                <CustomInput onChangeText={(text) => handleRegisterInput('rep', 'set', index, text)} />
                <CustomInput onChangeText={(text) => handleRegisterInput('weight', 'set', index, text)} />
              </View>

              <View flexDirection="row" alignItems="center" gap={'$5'}>
                <Text color={theme.textColor} fontSize={16} w={110}>Superset</Text>
                <CustomInput onChangeText={(text) => handleRegisterInput('rep', 'superSet', index, text)} />
                <CustomInput onChangeText={(text) => handleRegisterInput('weight', 'superSet', index, text)} />
              </View>
            </View>
            <Separator mt={'$5'} bg={theme.textColor} />
          </View>
        ))}

        <View w={'90%'} alignSelf="center" mt={'$4'}>
          <CustomButton onPress={handleFormSubmit} mb={'$5'} icon={<FontAwesome name="save" size={24} />}>Registrar Treino</CustomButton>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const CustomInput = (props: InputProps) => {
  return (
    <Input
      {...props}
      fontWeight={'900'}
      keyboardType="decimal-pad"
      w={80}
      borderWidth={3}
      color={'#0A3D3F'}
      borderColor={'#AFD897'}
      bg={'#F4F5E2'}
      focusStyle={{
        borderColor: '#0E5447'
      }}
      fontSize={18}
    />
  )
}