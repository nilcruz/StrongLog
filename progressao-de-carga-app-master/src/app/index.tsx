import { tamaguiConfig } from '../../tamagui.config';
import { TamaguiProvider } from 'tamagui';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useUser } from '@/hooks';
import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const { user } = useUser();

  useEffect(() => {
    if (loaded) {
      // setStatusBarBackgroundColor('red',true);
      // setStatusBarStyle('light'); 
    }

  }, [loaded])

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      {user.userId == null ? <Redirect href={'/login'} /> : <Redirect href={'/(tabs)/'} />}
    </TamaguiProvider>
  );
}