import { RegisterWorkoutProvider } from '@/context/RegisterWorkoutContext';
import { UserProvider } from '@/context/UserContext';
import { ThemeProvider } from '@/context/themeContext';
import { WorkoutProvider } from '@/context/workoutContext';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';


export default function Layout() {

  return (
    <>
      <UserProvider>
        <ThemeProvider>
          <WorkoutProvider>
            <RegisterWorkoutProvider>
              <Stack screenOptions={{
                headerStyle: { backgroundColor: '#0A3D3F' },
                headerTitleStyle: { color: '#E5EDCC' },
                headerTintColor: '#E5EDCC',
              }}>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='login' options={{ headerShown: false }} />
                <Stack.Screen name='(tabs)' options={{ headerShown: false, title: 'Home' }} />
                <Stack.Screen name='addWorkout'
                  options={{
                    title: 'Adicionar Treino',
                    headerBackTitleVisible: false,
                  }} />
                <Stack.Screen name='registerWorkout/[id]' options={{
                  title: 'Registrar Treino'
                }} />

                <Stack.Screen name='registerWorkout/details/[id]'
                  options={{
                    title: 'Visualizar Treino'
                  }} />
                <Stack.Screen name='signup' options={{ title: 'Cadastrar Nova Conta' }} />
                <Stack.Screen name='signin' options={{ title: 'Entrar' }} />
              </Stack>
            </RegisterWorkoutProvider>
          </WorkoutProvider>
        </ThemeProvider>
      </UserProvider>
      <Toast />
    </>
  )
}