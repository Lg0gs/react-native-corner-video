# react-native-corner-video
**Video** component for React Native applications, that extends [react-native-video](https://github.com/react-native-video/react-native-video) library and supports the following options:

 - [x] corner minimization
 - [x] works across the tabs
 - [x] works across the stacked screens
 - [x] starts playng from the current time

You can minimize video via `long press` on it and swipe to any corner
<img src="https://media1.giphy.com/media/iL8ct1yWqcAYWxN6mO/giphy.gif" /> &nbsp; <img src="https://media1.giphy.com/media/3DTnHEQv2r9x0TgpaK/giphy.gif" />

# Instalation

    yarn add react-native-corner-video
or

    npm install react-native-corner-video

> **Note**: 
> You need to install [react-native-video](https://github.com/react-native-video/react-native-video), [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/#installation) and [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs) libs. They represent native dependencies of the package!!

### iOS

    cd ios/ && pod install && cd ..

# Usage
In the **App.js** file, wrap everything in **VideoProvider** component

    import { VideoProvider } from 'react-native-corner-video';
	//
	export default function App() {
	  return (
		<VideoProvider>
		  //
		</VideoProvider>
	  )
	}

Import **VideoWrapper**  where you want to render your video

    import VideoWrapper from  'react-native-corner-video';
    //
    <VideoWrapper
	  style={styles.video}
	  cornerProps={{
		width: 150,
		height: 100,
		top: 50,
		bottom: 50,
		left: 7
		right: 7
	 }}
	 videoProps={{
	    source: { uri: <video_uri> },
	    resizeMode: 'cover',
		controls: true
	 }}
    />

# Props

|cornerProps||type|required|desc
|--|--|--|--|--|
|  |width|number|**true**|minimized video width|
|  |height|number|**true**|minimized video width|
||top|number|**true**|distance from top|
||bottom|number|**true**|distance from bottom|
||left|number|**true**|distance from left|
||right|number|**true**|distance from right|
|**videoProps**|[RNVideo](https://github.com/react-native-video/react-native-video#configurable-props) props|VideoProperties|**true**|
|**ref**|||**false**|video ref|
|**onPress**||void|**false**|handles long press event|