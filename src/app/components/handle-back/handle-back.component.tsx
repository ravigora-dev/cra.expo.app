import React, { useRef, useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';

type Props = {
  onBack: () => void;
  children: React.ReactNode;
}

export default function HandleBack({ onBack, children }: Props) {
  const backButton = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      backButton.current = BackHandler.addEventListener('hardwareBackPress', () => {
        if (onBack) {
          onBack();
          return true;
        }
        return false;
      });
    }

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => false);
      backButton.current = null;
    };
  }, []);

  return children;
};
