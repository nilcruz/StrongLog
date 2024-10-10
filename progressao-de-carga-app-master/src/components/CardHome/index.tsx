import { IExercises } from "@/interfaces/IWorkout";
import { Edit3 } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { Button, Text, View } from "tamagui";
import { useTheme, useWorkout } from '@/hooks';
import { Alert, TouchableOpacity } from "react-native";
import { workoutStorage } from "@/localStorage";

interface CardHomeProps {
  id: string;
  nameTraining?: string;
  exercises?: IExercises[];
}

export function CardHome({ id, nameTraining, exercises }: CardHomeProps) {
  const { theme } = useTheme();
  const { workout, setWorkout } = useWorkout();

  const handleDeleteWorkout = (id: string) => {
    Alert.alert(
      'Deletar treino',
      'Deja realmente deletar esse treino ? essa ação não podera ser desfeita!',
      [
        {
          text: 'cancelar',
          style: 'cancel'
        },
        {
          text: 'deletar',
          style: 'destructive',
          onPress: async () => {
            const index = workout.findIndex(el => el.id == id);
            const deleteWorkout = [...workout];

            deleteWorkout.splice(index, 1);
            await workoutStorage.set(deleteWorkout)
            setWorkout([...deleteWorkout]);
          }
        }
      ]
    )
  }

  return (
    <TouchableOpacity onLongPress={() => handleDeleteWorkout(id)}
    >

      <View
        mt={'$4'}
        borderRadius={'$1'}
        width={'100%'}
        flexDirection="row"
        backgroundColor={theme.bgCard}
        borderColor={theme.bgBorder}
        borderWidth={1}
        paddingVertical={'$2'}
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={'$2'}
      >
        <View jc={'center'} ai={'flex-start'}>
          <Text
            wordWrap="break-word"
            maxWidth={200}
            color={theme.textColor}
            fontSize={18}
            fontWeight={'900'}
          >
            {nameTraining}
          </Text>
          <Text color={theme.textColor} fontWeight={'200'} mt={2} fontSize={16}>{exercises?.length} exercicios</Text>
        </View>

        <Link href={`/registerWorkout/${id}`} asChild>
          <Button
            size={'$3'}
            bg={theme.primary}
            color={'#E5EDCC'}
            icon={<Edit3 size={18} color={'#E5EDCC'} />}
          >
            Registrar
          </Button>
        </Link>
      </View>
    </TouchableOpacity>
  )
}