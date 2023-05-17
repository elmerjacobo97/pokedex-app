import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {PokemonFull} from '../interfaces';
import {FadeInImage} from './FadeInImage';
import {getTypeColor} from '../helpers';

interface Props {
  pokemon: PokemonFull;
  color?: string;
}

export const PokemonDetails = ({pokemon, color}: Props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Types</Text>
        <View style={styles.typeContainer}>
          {pokemon.types.map(({type}) => (
            <View
              key={type.name}
              style={[
                styles.typeBadge,
                {backgroundColor: getTypeColor(type.name)},
              ]}>
              <Text style={styles.typeText}>{type.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Weight</Text>
        <Text style={styles.regularText}>{pokemon.weight} kg</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Sprites</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.entries(pokemon.sprites).map(([key, value]) => {
            if (value) {
              return (
                <FadeInImage
                  key={key}
                  uri={pokemon.sprites.front_default}
                  style={styles.sprite}
                />
              );
            }
          })}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Abilities</Text>
        <View style={styles.abilityContainer}>
          {pokemon.abilities.map(({ability}) => (
            <View key={ability.name} style={styles.abilityBadge}>
              <Text style={styles.abilityText}>{ability.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Moves</Text>
        <View style={styles.moveContainer}>
          {pokemon.moves.map(({move}) => (
            <Text key={move.name} style={styles.regularText}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Stats</Text>
        {pokemon.stats.map(stat => (
          <View key={stat.stat.name} style={styles.statContainer}>
            <Text style={styles.statName}>{stat.stat.name}</Text>
            <View style={styles.statBarContainer}>
              <View
                style={[
                  styles.statBar,
                  {width: `${stat.base_stat}%`, backgroundColor: color},
                ]}
              />
            </View>
            <Text style={styles.statValue}>{stat.base_stat}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Sprites</Text>
        <View style={styles.spriteContainer}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.fullSizeSprite}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  regularText: {
    fontSize: 18,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  typeBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  typeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sprite: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  abilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  abilityBadge: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  abilityText: {
    fontWeight: 'bold',
  },
  moveContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statName: {
    width: 150,
    textTransform: 'capitalize',
    fontSize: 16,
    marginRight: 10,
  },
  statBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#E1E1E1',
    borderRadius: 5,
    overflow: 'hidden',
  },
  statBar: {
    height: '100%',
    borderRadius: 5,
  },
  statValue: {
    marginLeft: 10,
    fontWeight: '500',
  },
  spriteContainer: {
    marginBottom: 70,
    alignItems: 'center',
  },
  fullSizeSprite: {
    width: 200,
    height: 200,
  },
});
