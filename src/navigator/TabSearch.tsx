import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParams} from './TabList';
import {PokemonScreen, SearchScreen} from '../screens';

const Tab = createStackNavigator<RootStackParams>();

export const TabSearch = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#FFF',
        },
      }}>
      <Tab.Screen name="HomeScreen" component={SearchScreen} />
      <Tab.Screen name="PokemonScreen" component={PokemonScreen} />
    </Tab.Navigator>
  );
};
