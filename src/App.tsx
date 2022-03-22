import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppProvider from '~/app/app.context';
import { SafeAreaContent } from '~/app/components/safe-area-content/safe-area-content.component';
import { MainNavigation } from '~/app/navigation/main.navigation';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
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
