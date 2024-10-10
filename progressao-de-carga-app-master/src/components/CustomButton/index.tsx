import { Button, ButtonProps } from "tamagui";
import { ActivityIndicator } from 'react-native';

interface CustomButtonProps extends ButtonProps{
  children?: string;
  loading?: boolean;
}

function CustomButton({children,...props }:CustomButtonProps) {
  return (
    <Button
      bg={'#0E5447'}
      color={"#E5EDCC"}
      size={'$5'}
      {...props}
    >
    {props.loading? <ActivityIndicator/>:children}
    </Button>
  )
}

export { CustomButton };