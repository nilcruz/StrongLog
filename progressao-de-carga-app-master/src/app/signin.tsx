import { CustomButton } from "@/components/CustomButton";
import { KeyboardAvoidingView } from "react-native";
import { H2, Input, Text, View } from "tamagui";

import { router } from 'expo-router';
import { auth, db } from '@/services/firebaseService';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { ref, get } from 'firebase/database';
import { useState } from "react";
import { useRegisterWorkout, useTheme, useUser, useWorkout } from "@/hooks";

import { toastCustom } from 'utils/toastCustom';
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useUser();
  const { setWorkout } = useWorkout();
  const { setRegisterWorkout } = useRegisterWorkout()

  const { theme } = useTheme();

  const pushDataFirebase = (uid: string) => {
    get(ref(db, 'users/' + uid)).then((snapshot) => {
      if (snapshot.exists()) {
        const { userId, name, workouts, registerWorkouts, } = snapshot.val()

        setUser({ userId: userId, userName: name })
        setWorkout(JSON.parse(workouts));
        setRegisterWorkout(JSON.parse(registerWorkouts));

        router.dismissAll()
        router.replace('/(tabs)/');
        return;

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const handleSignIn = () => {
    if(email == '' || password == '' || password.length < 8){
      toastCustom('Preencha os campos corretamente');
      return
    }

    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        if (user) {
          pushDataFirebase(user.uid)
        }
      })
      .catch((error) => {
        console.log(error.code);
        if(error.code == 'auth/invalid-credential'){
          toastCustom('Email ou senha invalido.')
        }
        setLoading(false)
      })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:theme.bg }}
      behavior="padding">

      <View w={'90%'} alignSelf="center">
        <H2 color={theme.textColor}>Entrar</H2>

        <View mt={'$4'}>
          <Text
            fontSize={16}
            fontWeight={'900'}
            color={theme.textColor}
          >
            Email:
          </Text>
          <Input
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Digite seu email"
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

        <View mt={'$4'}>
          <Text
            fontSize={16}
            fontWeight={'900'}
            color={theme.textColor}
            >
            Senha:
          </Text>
          <Input
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry
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

        <CustomButton onPress={() => {handleSignIn()}} loading={loading} mt={'$4'}>Entrar</CustomButton>
      </View>
    </KeyboardAvoidingView>
  );
}