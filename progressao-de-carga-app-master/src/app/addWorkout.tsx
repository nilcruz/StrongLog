import { CustomButton } from "@/components/CustomButton";
import { Button, Input, ListItem, ScrollView, Text, View } from "tamagui";
import { Plus, Trash } from '@tamagui/lucide-icons';
import { Alert, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { useTheme, useWorkout } from "@/hooks";
import { workoutStorage } from '@/localStorage';
import { IWorkout, IExercises } from '@/interfaces/IWorkout';
import uuid from 'react-native-uuid';
import { router } from 'expo-router';
import { toastCustom } from 'utils/toastCustom';

export default function addWorkout() {
  const { theme } = useTheme();

  const workout: IWorkout = {
    id: String(uuid.v4()),
    nameWorkout: '',
    exercises: [],
    comment: '',
  };

  const [nameWorkout, setNameWorkout] = useState('');
  const [comment, setComment] = useState('');
  const [exercisesList, setExercisesList] = useState<IExercises[]>([]);
  const [currentExercise, setCurrentExercise] = useState('');

  const { setWorkout } = useWorkout();

  const addExercisesInList = (): void => {
    if (currentExercise == '') {
      toastCustom('Campo em branco', 'Preencha Corretamente o Campo');
      return;
    }

    const newExercise: IExercises = {
      id: String(uuid.v4()),
      name: currentExercise,
    };

    setExercisesList([...exercisesList, newExercise]);
    setCurrentExercise('');
  }

  const deleteExerciseInList = (id: number): void => {
    let deleteExercise = [...exercisesList];
    deleteExercise.splice(id, 1)

    setExercisesList([...deleteExercise])
  }

  const handleFormSubmit = async () => {
    if (nameWorkout == '') {
      toastCustom('Campo em branco', 'O campo "nome do treino" é obrigatório.');
      return;
    }

    if (exercisesList.length == 0) {
      toastCustom('Nenhum exercício adicionado ',
        'É necessario ao menos um exercício para adicionar o treino.'
      );
      return;
    }

    if (comment != '' && comment.length < 5) {
      toastCustom('Observação muito curta');
      return
    }

    workout.nameWorkout = nameWorkout;
    workout.exercises = [...exercisesList];
    workout.comment = comment;

    const getWorkout: IWorkout[] | [] = await workoutStorage.get();
    if (getWorkout) {
      const newData = [...getWorkout, workout];
      await workoutStorage.set(newData);
      setWorkout(newData);
      toastCustom('Novo treino adicionado com sucesso', 'O treino já está disponivel na tela inicial', 'success');
      router.back();
      return
    }
    await workoutStorage.set(workout);
    setWorkout([workout]);
    toastCustom('Novo treino adicionado com sucesso', 'O treino já está disponivel na tela inicial', 'success');
    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex:1,
        paddingTop: 10,
        backgroundColor: theme.bg,
        justifyContent: 'center',
        alignItems: 'center',
      }}

      behavior="padding"
    >
      <ScrollView bg={theme.bg} width={'90%'} alignSelf="center">
        <View>
          <Text
            fontSize={16}
            fontWeight={'900'}
            color={theme.textColor}
          >
            Nome do Treino
          </Text>
          <Input
            onChangeText={(text) => setNameWorkout(text)}
            placeholder="Ex: Costas e Biceps..."
            mt={'$2'}
            size={'$5'}
            borderWidth={3}
            color={'#0A3D3F'}
            borderColor={'#AFD897'}
            bg={'#F4F5E2'}
            focusStyle={{
              borderColor: '#0E5447'
            }} />
        </View>

        <View w={'100%'} mt={'$4'}>


          <View mt={'$4'}>
            <View
              flexDirection="row"
              gap={'$2'}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text
                fontSize={16}
                fontWeight={'900'}
                color={theme.textColor}>
                Exercicios:
              </Text>

            </View>

            <View>
              {exercisesList.map((item, index) => {
                return (
                  <ListItem
                    bg={theme.bg}
                    key={index}
                    gap={'$5'}
                    justifyContent="space-between"
                    alignItems="center">
                    <Text
                      color={theme.textColor}
                      fontSize={16}
                    >
                      {index + 1} - {item.name}
                    </Text>
                    <Button
                      onPress={() => deleteExerciseInList(index)}
                      color={'$red4Light'}
                      size={'$4'}
                      fontWeight={'900'}
                      scaleIcon={1.4}
                      icon={<Trash color={'$red4Light'} />} bg={'$red10Dark'}>Apagar</Button>
                  </ListItem>
                );
              })}

            </View>

            <Input
              value={currentExercise}
              onChangeText={(text) => setCurrentExercise(text)}
              placeholder="Ex: Remada Curvada"
              mt={'$2'}
              size={'$5'}
              borderWidth={3}
              color={'#0A3D3F'}
              borderColor={'#AFD897'}
              bg={'#F4F5E2'}
              focusStyle={{
                borderColor: '#0E5447'
              }} />
          </View>


          <CustomButton
            onPress={addExercisesInList}
            mt={'$3'}
            variant="outlined"
            size={'$5'}
            borderWidth={3}
            borderColor={'#0E5447'}
            bg={'#F4F5E2'}
            color={'#0E5447'}
            icon={<Plus color={'#0E5447'} size={24} />}
          >
            Adicionar a lista de exercicios
          </CustomButton>
        </View>

        <View mt={'$4'}>
          <Text
            fontSize={16}
            fontWeight={'900'}
            color={theme.textColor}
          >
            Observação:
          </Text>

          <Input
            onChangeText={(text) => setComment(text)}
            placeholder="Digite uma observação caso necessario."
            mt={'$2'}
            size={'$5'}
            borderWidth={3}
            color={'#0A3D3F'}
            borderColor={'#AFD897'}
            bg={'#F4F5E2'}
            focusStyle={{
              borderColor: '#0E5447'
            }}
          />
          <CustomButton mt={'$3'} onPress={handleFormSubmit}>Adicionar Treino</CustomButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}