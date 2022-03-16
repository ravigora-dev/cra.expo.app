import { Linking, Platform } from "react-native";

const canOpen = (url: string) => {
  return Linking.canOpenURL(url)
  .then(canOpen => {
    if (!canOpen) {
      return false;
    } else {
      return Linking.openURL(url);
    }
  })
  .catch(e => false);
}

const handleRequest = (event: any) => {
    const { url } = event;
    if (url.slice(0, 3) === "tel") {
      let phoneNumber = Platform.OS === "ios" ? url.replace("tel", "telprompt") : url;
      canOpen(phoneNumber);
      return false;
    }

    if (url.slice(0, 6) === "mailto") {
      canOpen(url);
      return false;
    }
     
    return true;
  }

export default handleRequest