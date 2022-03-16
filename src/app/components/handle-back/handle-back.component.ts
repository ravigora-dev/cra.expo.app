import { FC, useRef, useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';

export const HandleBack: FC<any> = ({ onBack, children }): JSX.Element | null => {
  const backButton = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      backButton.current = BackHandler.addEventListener('hardwareBackPress', () => {
        if (onBack) {
          return onBack();
        }
        // return true;
      });
    }

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => false);
      backButton.current = null;
    };
  }, []);

  return children;
};

export default HandleBack;
