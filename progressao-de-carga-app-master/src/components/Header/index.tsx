import { useUser } from "@/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Text, View, XStack, YStack } from "tamagui";

function Header() {
  const { user } = useUser();

  return (
    <SafeAreaView>

    <View
      width={'100%'}
      bg={'#0A3D3F'}
      paddingTop={'$2'}
      paddingBottom={'$2'}
      alignItems="center"
    >
      <XStack
        ai={'center'}
        gap={'$4'}
        width={'90%'}
        >
        <Avatar circular size="$4">
          <Avatar.Image src="https://picsum.photos/200/300?grayscale" />
          <Avatar.Fallback bc="red" />
        </Avatar>

        <YStack gap={0}>
          <Text
            color={'#E5EDCC'}
            fontSize={'$8'}
            fontWeight={'900'}
            >Bem Vindo</Text>

          <Text
            color={'#E5EDCC'}
            fontSize={'$5'}
            >
            {user?.userName}
          </Text>
        </YStack>
      </XStack>
    </View>
            </SafeAreaView>
  )
}

export { Header };