import { Link } from "expo-router";
import { Button, H2, View, YStack } from "tamagui";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import LottieView from "lottie-react-native";
import { useTheme } from "@/hooks";

export default function Login() {
  const { theme } = useTheme();
  return (
    <View
      f={1} bg={theme.bg}
      ai={'center'}
      jc={"center"}
    >
      <View w={'90%'} gap={'$7'} ai={'center'}>
        <H2
          width={300}
          alignSelf="flex-start"
          lineHeight={"$9"}
          color={theme.textColor}>
          Olá, Seja Bem Vindo(a)
        </H2>

        <LottieView
          autoPlay
          style={{
            width: 300,
            height: 300,
          }}
          source={require('@/assets/animation-home.json')}
        >

        </LottieView>
        <YStack w={'100%'} gap={'$3'}>

          <Link href={'/signin'} asChild>
            <Button
              mt={'$4'}
              bg={'#0E5447'}
              color={'#E5EDCC'}
              size={'$5'}
              icon={<FontAwesome name='sign-in' color={'#E5EDCC'} size={32} />}
            >

              Entrar com e-mail e senha
            </Button>
          </Link>

          <Link href={'/signup'} asChild>
            <Button
              variant="outlined"
              size={'$5'}
              borderColor={theme.name == 'light'?'#0E5447':theme.textColor}
              color={theme.name == 'light'?'#0E5447':theme.textColor}
            >
              Realizar cadastro
            </Button>
          </Link>
        </YStack>
      </View>
    </View>
  )
}

export { Login };