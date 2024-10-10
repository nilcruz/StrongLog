import { CustomButton } from "@/components/CustomButton";
import { KeyboardAvoidingView } from "react-native";
import { H2, Input, ScrollView, Text, View } from "tamagui";
import { router } from 'expo-router';
import { auth, db, firebaseApp } from '@/services/firebaseService';
import { User, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useState } from "react";
import { useTheme, useUser } from "@/hooks";
import { userStorage } from "@/localStorage";
import { toastCustom } from 'utils/toastCustom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useUser();
  const { theme } = useTheme();

  const IsValidInput = () => {
    if (name == '') {
      toastCustom('Campo de nome em branco');
      return false;
    }

    if (email == '') {
      toastCustom('Campo de email em branco');
      return false;
    }

    if (password == '') {
      toastCustom('Campo de senha em branco');
      return false;
    }

    if (password.length < 8) {
      toastCustom('Senha inválida', 'Digite uma senha com no minimo 8 cáracteres.')
      return false;
    }

    if (password != repeatPassword) {

      toastCustom('Senha inválida', 'As senhas digitadas não coincidem')
      return false;
    }
    return true;
  }

  const createUserInDatabase = async (user: User, name: string) => {
    set(ref(db, 'users/' + user.uid), {
      userId: user.uid,
      name: name,
      workouts: "[]",
      registerWorkouts: "[]",
      config: "[]"
    });

    const userData = {
      userId: user.uid,
      userName: name
    }

    setUser(userData);
    await userStorage.set(userData);
    toastCustom('Cadastro realizado com sucesso.', 
    'você já pode efetuar o login normalmente','success');
    setLoading(false);
    router.back()
    // router.dismissAll()
    // router.replace('/(tabs)/');
  }

  const handleSignUp = () => {
    if (!IsValidInput()) {
      return
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        if (user) {
          createUserInDatabase(user, name);
        }
      })
      .catch((error) => {
        toastCustom('Erro ao realizar cadastro', 'verifique seus dados e tente novamente')
        setLoading(false)
      })
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.bg }}
      behavior="padding">

      <ScrollView w={'90%'} mt={'$3'} alignSelf="center" showsVerticalScrollIndicator={false}>
        <H2 color={theme.textColor}>Cadastrar nova conta</H2>
        <View mt={'$5'}>
          <Text
            fontSize={16}
            fontWeight={'900'}
            color={theme.textColor}
          >
            Nome:
          </Text>
          <Input
            onChangeText={setName}
            placeholder="Digite seu nome"
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
            Email:
          </Text>
          <Input
            onChangeText={setEmail}
            placeholder="Digite seu melhor email"
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
            secureTextEntry
            placeholder="Digite uma senha"
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
            Confirme sua senha:
          </Text>
          <Input
            onChangeText={setRepeatPassword}
            placeholder="Repita sua senha"
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
        <CustomButton loading={loading} onPress={handleSignUp} mt={'$4'}>Realizar Cadastro</CustomButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}