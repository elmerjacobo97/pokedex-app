import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParams} from './TabList';
import {PokemonScreen} from '../screens';
import {FavoritesScreen} from '../screens';

const Tab = createStackNavigator<RootStackParams>();

export const TabFavorites = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#FFF',
        },
      }}>
      <Tab.Screen name="HomeScreen" component={FavoritesScreen} />
      <Tab.Screen name="PokemonScreen" component={PokemonScreen} />
    </Tab.Navigator>
  );
};
