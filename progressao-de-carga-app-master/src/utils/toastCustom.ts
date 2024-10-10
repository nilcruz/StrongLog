import Toast from "react-native-toast-message"
export const toastCustom = (text1?: string, text2?: string, type:string = 'error') => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    text1Style: { fontSize: 16 },
    text2Style:{fontSize:14},
  })
}