import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const Loading = () => {
  return (
    <View style={styles.activityIndicator}>
      <ActivityIndicator color="grey" size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
