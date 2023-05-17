import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const PokedexLogo = () => {
  const {top} = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.container,
        top: top + 20,
        marginBottom: top + 20,
        paddingBottom: 15,
      }}>
      <Image
        source={require('../assets/pokedex-logo.png')}
        style={styles.image}
      />
      <Text
        style={{
          ...styles.text,
        }}>
        Pokedex
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5856D6',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});
