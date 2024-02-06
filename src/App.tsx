import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppProvider from '~/app/app.context';
import SafeAreaContent from '~/app/components/safe-area-content/safe-area-content.component';
import MainNavigation from '~/app/navigation/main.navigation';

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    'NeoSansStdMedium': require('app/assets/fonts/Neo-Sans-Std-Medium.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppProvider>
      <SafeAreaProvider>
        <SafeAreaContent>
          <StatusBar style="light" />
          <QueryClientProvider client={queryClient}>
            <MainNavigation />
          </QueryClientProvider>
        </SafeAreaContent>
      </SafeAreaProvider>
    </AppProvider>
  );
}
