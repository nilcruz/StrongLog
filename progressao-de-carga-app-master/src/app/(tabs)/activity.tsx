import { Calendar, Delete } from "@tamagui/lucide-icons";
import { Alert, SafeAreaView, TouchableOpacity } from "react-native";
import { ListItem, Text, View, YGroup } from "tamagui";
import { useTheme, useRegisterWorkout } from '@/hooks';
import { FlatList } from 'react-native';
import { Link } from "expo-router";
import { registerWorkoutStorage } from "@/localStorage";

export default function Activity() {
  const { theme } = useTheme();
  const { registerWorkout, setRegisterWorkout } = useRegisterWorkout();

  const handleDeleteRegisterWorkout = (id: number) => {
    Alert.alert(
      'Deletar Registro',
      'Deja realmente deletar esse registro ? essa ação não podera ser desfeita!',
      [
        {
          text: 'cancelar',
          style: 'cancel'
        },
        {
          text: 'deletar',
          style: 'destructive',
          onPress: async () => {
            const deleteRegisterWorkout = [...registerWorkout];
            deleteRegisterWorkout.splice(Number(id), 1);
            await registerWorkoutStorage.set(deleteRegisterWorkout)
            setRegisterWorkout([...deleteRegisterWorkout]);
          }
        }
      ]
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <View
        mt={'$10'}
        f={1}
        justifyContent="flex-start"
        alignItems="flex-start">

        <Text
          w={'90%'}
          alignSelf="center"
          fontWeight={'900'}
          color={theme.textColor}
          fontSize={18}
        >
          Suas Atividades
        </Text>

        {registerWorkout.length > 0 ? (
          <YGroup mt={'$4'} alignSelf="center" h={'100%'} width={240} size="$4" w={'90%'} gap={5}>
            <YGroup.Item>
              <FlatList
                data={registerWorkout.reverse()}
                renderItem={({ item, index }) => (
                  <Link href={`/registerWorkout/details/${index}`} asChild>
                    <TouchableOpacity onLongPress={()=>handleDeleteRegisterWorkout(index)}>
                      <ListItem
                        mt={'$4'}
                        borderRadius={'$1'}
                        borderWidth={1}
                        borderColor={theme.bgBorder}
                        bg={theme.bgCard}
                        color={theme.textColor}
                        width={'100%'}
                        icon={Calendar}
                        title={<Text color={theme.textColor}>{item.workoutName}</Text>}
                        subTitle={<Text color={theme.textColor}>{item.date}</Text>}
                      />
                    </TouchableOpacity>
                  </Link>
                )}
              />

            </YGroup.Item>
          </YGroup>
        ) : <NoRegisterWorkout />}

      </View>
    </SafeAreaView>
  )
}

const NoRegisterWorkout = () => {
  const { theme } = useTheme();
  return (
    <View f={1} w={'90%'} alignSelf="center" alignItems="center" justifyContent="center">
      <Text  fontSize={18}
        fontWeight={'900'}
        color={theme.textColor}
        textAlign="center">Nenhum treino foi salvo até o momento</Text>
    </View>
  )
}