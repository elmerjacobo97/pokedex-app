import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebouncedValue} from '../hooks';

interface Props {
  onDebounce: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({style, onDebounce}: Props) => {
  const [textValue, setTextValue] = useState('');
  const debouncedValue = useDebouncedValue(textValue, 500);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue, onDebounce]);

  return (
    <View style={{...styles.container, ...(style as any)}}>
      <View style={styles.textBg}>
        <TextInput
          style={{...styles.textInput, top: Platform.OS === 'ios' ? 0 : 2}}
          value={textValue}
          onChangeText={setTextValue}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Buscar pokemon por nombre o id ..."
        />
        <Icon name="search-outline" color="rgba(0, 0, 0, 0.6)" size={25} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textBg: {
    backgroundColor: '#F3F3F1',
    borderRadius: 50,
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
});
