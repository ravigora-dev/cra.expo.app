import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home.screen';
import NotFoundScreen from '../screens/not-found.screen';
import ProductScreen from '../screens/product.screen';
import ScannerScreen from '../screens/scanner.screen';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Scanner" component={ScannerScreen} />
          <Stack.Screen name="Product" component={ProductScreen} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
