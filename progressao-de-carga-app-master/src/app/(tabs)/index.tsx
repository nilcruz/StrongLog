import { H3, Image, Separator, Text, View } from "tamagui";
import { Header } from "../../components/Header";
import { FlatList, SafeAreaView } from "react-native";
import { CustomButton } from "../../components/CustomButton";
import { Plus } from '@tamagui/lucide-icons';
import { Link } from "expo-router";
import { CardHome } from "@/components/CardHome";
import { useWorkout, useTheme } from '@/hooks';

export default function Home() {
  const { theme } = useTheme();
  const { workout } = useWorkout();

  return (
    <View bg={theme.bg} f={1}>
      <Header />

      <View gap={5} height={'100%'} w={'90%'} alignSelf="center">
        <Text
          mt={'$4'}
          w={'90%'}
          alignSelf="center"
          fontWeight={'900'}
          color={theme.textColor}
          fontSize={18}
        >
          Seus Treinos
        </Text>
        <Separator borderColor={theme.textColor} />

        {workout?.length > 0 ? (
          <FlatList
            style={{ maxHeight: '65%' }}
            data={workout}
            renderItem={({ item, index }) =>
              <CardHome
                nameTraining={item.nameWorkout}
                key={index}
                id={item.id}
                exercises={item.exercises}
              />
            }
          />
        ) : <NoWorkout />}
        <Link href={'/addWorkout'} asChild>
          <CustomButton mt={0} icon={Plus}>Adicionar Treino</CustomButton>
        </Link>
      </View>
    </View>
  )
}

const NoWorkout = () => {
  const { theme } = useTheme();

  return (
    <View
      gap={10}
      mt={'$5'}
    >
      <Text
        fontSize={18}
        fontWeight={'900'}
        color={theme.textColor}
        textAlign="center"
      >
        Nenhum treino para registrar, começe adicionando um novo treino a sua lista.
      </Text>
      <Image
        alignSelf="center"
        source={require('@/assets/login-illustration.png')}
        width={300}
        height={300}
      />
    </View>
  )
}