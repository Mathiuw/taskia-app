import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

// video file lives in the project's top-level `assets` folder
const videoSource = require("../assets/tutorial_teste.mp4")

const TutorialVideoScreen = ({ videoUri, onSkip, navigation }) => {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop= true;
    player.volume= 0;
    player.staysActiveInBackground= false;
    player.play()
  })

  return (
    <View style={styles.container}>
      {/* <Video
        source={{ uri: "https://drive.google.com/file/d/1XdVjvidDOJNX_Gil7Gkv5cryLpvU4BGn/view?usp=drive_link" }}
        style={styles.video}
        shouldPlay={true}
        isMuted={false}
        resizeMode="cover"
      /> */}
      <VideoView 
        player={player}
        style={styles.video}
        allowsFullscreen
      />
      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={() => {navigation.navigate("Drawer")}}
        activeOpacity={0.8}
      >
        <Text style={styles.skipText}>Ir para o App</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    right: 16,
    top: 32,
    backgroundColor: "#0088ffff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TutorialVideoScreen;