import { Alert } from 'react-native';

type Options = {
  content: string;
};
enum ActionType {
  Confirm,
  Cancel,
}
type Response = {
  confirm: boolean;
};
export function confirm(message: string) {
  return new Promise<Response>((resolve, reject) => {
    Alert.alert('提示', message, [
      {
        text: '取消',
        style: 'default',
        onPress() {
          reject();
        },
      },
      {
        text: '确定',
        onPress: () => {
          resolve({
            confirm: true,
          });
        },
      },
    ]);
  });
}
