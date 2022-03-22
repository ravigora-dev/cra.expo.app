import { Linking, Platform } from 'react-native';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';

enum EvenTypes {
  Tel = 'tel',
  Mailto = 'mailto',
}

const canOpen = async (url: string) => {
  try {
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      return false;
    }
    return Linking.canOpenURL(url);
  } catch (e) {
    console.log(e);
  }
};

const handleRequest = (event: WebViewNativeEvent) => {
  const { url } = event;
  if (url.slice(0, 3) === EvenTypes.Tel) {
    let phoneNumber = Platform.OS === 'ios' ? url.replace('tel', 'telprompt') : url;
    canOpen(phoneNumber);
    return false;
  }

  if (url.slice(0, 6) === EvenTypes.Mailto) {
    canOpen(url);
    return false;
  }

  return true;
};

export default handleRequest;
