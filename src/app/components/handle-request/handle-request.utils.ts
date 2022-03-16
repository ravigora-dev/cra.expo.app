import { Linking, Platform } from 'react-native';

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

const handleRequest = (event: any) => {
  const { url } = event;
  if (url.slice(0, 3) === 'tel') {
    let phoneNumber = Platform.OS === 'ios' ? url.replace('tel', 'telprompt') : url;
    canOpen(phoneNumber);
    return false;
  }

  if (url.slice(0, 6) === 'mailto') {
    canOpen(url);
    return false;
  }

  return true;
};

export default handleRequest;
