import React from 'react';
import { StyleSheet, View } from 'react-native';
import VideoWrapper from 'react-native-corner-video';

const uri: string = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const VideoScreen = () => {
  return (
    <View style={styles.container}>
      <VideoWrapper
        style={{ width: '100%', height: 200, marginBottom: 30 }}
        cornerProps={{ width: 150, height: 100, top: 50, right: 7, bottom: 50, left: 7 }}
        videoProps={{
          source: { uri },
          resizeMode: 'cover',
          controls: true
        }}
      />
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