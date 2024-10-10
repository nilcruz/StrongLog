import { settingStorage } from '@/localStorage';
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';
import { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface ThemeProps {
  name: string;
  primary: string;
  bg: string;
  textColor: string;
  textButton: string;
  bgCard: string;
  bgBorder: string;
  bottomBg: string;
  bottomTint: string
}

interface ThemeContextProps {
  theme: ThemeProps;
  toggleTheme: (theme: 'light' | 'dark') => void;
}

const lightTheme: ThemeProps = {
  name: 'light',
  primary: '#0E5447',
  textButton: '#E5EDCC',
  bg: '#F9F9F9',
  textColor: '#0A3D3F',
  bgCard: '#F4F5E2',
  bgBorder: '#0A3D3F',
  bottomBg: '#f5f5f5',
  bottomTint: '#0A3D3F'
}

const darkTheme: ThemeProps = {
  name: 'dark',
  primary: '#0E5447',
  textButton: '#E5EDCC',
  bg: '#141917',
  textColor: '#E5EDCC',
  bgCard: '#404443',
  bgBorder: '#E5EDCC',
  bottomBg: '#121313',
  bottomTint: '#E5EDCC'
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeProps>({ ...lightTheme });

  useEffect(() => {
    if (Platform.OS == 'android') {
      setStatusBarBackgroundColor('#0A3D3F', true);
      setStatusBarStyle('light');
      return;
    }

    else {
      if (theme.name == 'light') {
        setStatusBarStyle('dark')
      }

      else {
        setStatusBarStyle('light')
      }
    }
  }, [theme])

  useEffect(() => {
    const getTheme = async () => {
      const { theme } = await settingStorage.get();
      if (theme) {
        toggleTheme(theme);
      }
    }

    getTheme();
  }, [])

  const toggleTheme = (value: 'light' | 'dark') => {
    if (value == 'light') {
      setTheme(lightTheme);
    }

    else {
      setTheme(darkTheme)
    }
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}