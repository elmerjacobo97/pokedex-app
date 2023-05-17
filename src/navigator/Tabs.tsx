import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabList} from './TabList';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {TabSearch} from './TabSearch';
import {TabFavorites} from './TabFavorites';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#FFF'}}
      screenOptions={{
        tabBarActiveTintColor: '#5856D6', // headerTintColor: 'green',
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0, // android
          marginBottom: Platform.OS === 'android' ? 0 : 0,
          backgroundColor: 'rgba(255,255,255,0.92)',
          // height: Platform.OS === 'android' ? 0 : 60,
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={TabList}
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({color, size}) => (
            <Icon color={color} size={size} name="list-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={TabSearch}
        options={{
          tabBarLabel: 'Búsqueda',
          tabBarIcon: ({color, size}) => (
            <Icon color={color} size={size} name="search-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesScreen"
        component={TabFavorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({color, size}) => (
            <Icon color={color} size={size} name="heart-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
