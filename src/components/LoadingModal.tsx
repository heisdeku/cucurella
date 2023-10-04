/* eslint-disable react-native/no-inline-styles */
import theme from '@libs/theme';
import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export const LoadingModal = ({loading}: {loading: boolean}) => {
  // const testLoading = true;
  const initialPosition = 20;
  const finalPosition = 1;
  const translateY = useSharedValue(initialPosition);

  const handleSlide = useCallback(() => {
    // If the box is already at the initial position, slide it up
    // Otherwise, reset it back to the initial position
    translateY.value = loading
      ? withTiming(-finalPosition)
      : withTiming(initialPosition);
  }, [loading, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  useEffect(() => {
    handleSlide();
  }, [handleSlide, loading]);

  if (!loading) {
    return <></>;
  }
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00001ad1',
        },
        animatedStyle,
      ]}>
      <ActivityIndicator size="large" color={theme.colors.white} />
    </Animated.View>
  );
};
