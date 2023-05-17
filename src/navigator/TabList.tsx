import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, PokemonScreen} from '../screens';
import {SimplePokemon} from '../interfaces';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: {
    simplePokemon: SimplePokemon;
    color: string;
  };
};

const Stack = createStackNavigator<RootStackParams>();

export const TabList = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#FFF',
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
};
