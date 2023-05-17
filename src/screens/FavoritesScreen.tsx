import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {PokemonCard} from '../components';
import {styles} from '../theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const FavoritesScreen = () => {
  const {top, bottom} = useSafeAreaInsets();
  const {favorites} = useSelector((state: RootState) => state.favorites);

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
        paddingBottom: bottom + 40,
      }}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          // Header
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                marginTop: top,
                marginBottom: 10,
              }}>
              Favoritos
            </Text>
          }
          // Render
          renderItem={({item}) => <PokemonCard pokemon={item} />}
        />
      ) : (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Text
            style={{
              ...styles.globalMargin,
              marginTop: top,
              marginBottom: 10,
              fontSize: 20,
            }}>
            No tienes favoritos aún
          </Text>
        </View>
      )}
    </View>
  );
};
