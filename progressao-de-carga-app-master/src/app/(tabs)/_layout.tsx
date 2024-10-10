import React from 'react';
import IonIcons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useTheme } from '@/hooks';

const options = {
  tabBarActiveTintColor: 'blue', headerShown: false,
  // tabBarInactiveTintColor: '#aeaeae',
  tabBarStyle: {
    paddingBottom: 5,
    paddingTop: 5,
    height: 60,
  }
}

export default function TabLayout() {
  const { theme } = useTheme();
  return (
    <Tabs screenOptions={{ ...options, tabBarStyle: { backgroundColor: theme.bottomBg } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => <IonIcons size={28} name="home-sharp"
            color={focused ? theme.bottomTint : color} />,
          tabBarActiveTintColor: theme.bottomTint
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          headerTintColor: '#0A3D3F',
          title: 'Atividade',
          tabBarIcon: ({ color, focused }) => <IonIcons size={28} name="analytics-sharp"
            color={focused ? theme.bottomTint : color} />,
          tabBarActiveTintColor: theme.bottomTint
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, focused }) => <IonIcons size={28} name="settings-sharp"
            color={focused ? theme.bottomTint : color} />,
          tabBarActiveTintColor: theme.bottomTint
        }}
      />
    </Tabs>
  );
}