import React from 'react';
import { StyleSheet, View } from 'react-native';
import CornerVideo from 'react-native-corner-video';

const VideoScreen = () => {
    return (
      <View style={styles.container}>
        <CornerVideo style={styles.cornerVideo} />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cornerVideo: {
        width: '100%',
        height: 200,
        backgroundColor: 'lightgray'
    }
})

export default VideoScreen;