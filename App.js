import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const App = () => {
  return (
    <SafeAreaView>
      <Image
        style={styles.backgroundImage}
        source={require('./assets/bkg.jpg')}
      />
      <Image
        style={styles.backgroundAbstractImage}
        source={require('./assets/abstract.png')}
      />
      <View style={styles.contentContainer}>
        <DraggableBox>
          <BlurView
            blurType="light"
            blurAmount={20}
            style={styles.cardContainer}>
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              useAngle
              angle={110}
              style={styles.card}
            />
          </BlurView>
        </DraggableBox>
      </View>
    </SafeAreaView>
  );
};

const DraggableBox = (props) => {
  const _translateX = new Animated.Value(0);
  const _translateY = new Animated.Value(0);
  const _lastOffset = {x: 0, y: 0};

  const _onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: _translateX,
          translationY: _translateY,
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const _onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _lastOffset.x += event.nativeEvent.translationX;
      _lastOffset.y += event.nativeEvent.translationY;
      _translateX.setOffset(_lastOffset.x);
      _translateX.setValue(0);
      _translateY.setOffset(_lastOffset.y);
      _translateY.setValue(0);
    }
  };

  return (
    <PanGestureHandler
      {...props}
      onGestureEvent={_onGestureEvent}
      onHandlerStateChange={_onHandlerStateChange}>
      <Animated.View
        style={[
          styles.draggableBox,
          {transform: [{translateX: _translateX}, {translateY: _translateY}]},
        ]}>
        {props.children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: undefined,
    aspectRatio: 1,
    zIndex: 1,
  },
  backgroundAbstractImage: {
    position: 'absolute',
    height: undefined,
    width: '100%',
    aspectRatio: 1,
    zIndex: 5,
    transform: [{translateY: 200}, {rotateZ: '-55deg'}, {scale: 1.5}],
  },
  contentContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: 350,
    height: 200,
  },
  card: {
    height: '100%',
    width: '100%',
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    borderWidth: 2,
  },
  draggableBox: {
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default App;
