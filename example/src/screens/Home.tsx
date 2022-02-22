import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text>Home!</Text>
      <Button
        title='Push Other'
        onPress={() => navigation.navigate('OtherScreen')}
        />
    </View>
  );
}

const OtherScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Other Stacked screen!</Text>
    </View>
  );
}

const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="OtherScreen" component={OtherScreen} />
      </HomeStack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default HomeStackScreen;