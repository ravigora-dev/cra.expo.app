import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppProvider from '~/app/app.context';
import { SafeAreaContent } from '~/app/components/safe-area-content/safe-area-content.component';
import { MainNavigation } from '~/app/navigation/main.navigation';

export default function App() {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <SafeAreaContent>
          <StatusBar style="light" />
          <MainNavigation />
        </SafeAreaContent>
      </SafeAreaProvider>
    </AppProvider>
  );
}
