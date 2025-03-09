import React, {useCallback, useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  Modal,
  Pressable,
  Animated,
  PanResponder,
  LayoutChangeEvent,
} from 'react-native';
import {Label} from '../label';
import {BottomSheetProps} from './types';
import {useNewTheme} from 'react-core';
import {getStyle} from './styles';
import {CancelIcon} from 'app/assets/svg';
import {variants} from '../label/types';
import {TopIndicatorBar} from 'app/assets/svg/top-indicator-bar';
const CustomBottomSheet = (properties: BottomSheetProps) => {
  const {
    id,
    title,
    visible = false,
    children,
    closeButtonIcon,
    onClose,
    fullScreen,
    topIndicatorBar,
    customSheetStyle,
  } = properties;
  const theme = useNewTheme();
  const styles = getStyle({theme});
  const {height: screenHeight} = Dimensions.get('window');
  const contentHeight = useRef(0);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const onContentLayout = (event: LayoutChangeEvent) => {
    const {height: LayoutHeight} = event.nativeEvent.layout;
    const safeHieght = Math.min(LayoutHeight, screenHeight * 1);
    contentHeight.current = safeHieght;
    animatedHeight.setValue(safeHieght);
  };

  const fullScreenSheet = useCallback(() => {
    Animated.timing(animatedHeight, {
      toValue: screenHeight,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [animatedHeight, screenHeight]);

  const ContentScreenSheet = useCallback(() => {
    Animated.timing(animatedHeight, {
      toValue: contentHeight.current,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [animatedHeight, contentHeight]);

  const closeSheet = useCallback(() => {
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [animatedHeight]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dy: animatedHeight}]),
    onPanResponderRelease(_, gestureState) {
      if (gestureState.dy > 100) {
        ContentScreenSheet();
      } else {
        fullScreenSheet();
      }
    },
  });
  useEffect(() => {
    if (visible) {
      ContentScreenSheet();
    } else {
      closeSheet();
    }
  }, [visible, closeSheet, ContentScreenSheet, fullScreenSheet, fullScreen]);

  return (
    <Modal
      id={id}
      transparent
      statusBarTranslucent={!fullScreen}
      visible={visible}
      animationType="slide">
      <View style={styles.overlay}>
        <Animated.View
          onLayout={onContentLayout}
          style={[
            fullScreen ? styles.fullScreenBottomSheet : styles.bottomSheet,
            customSheetStyle,
          ]}
          {...panResponder.panHandlers}>
          {topIndicatorBar && (
            <View id="topIndicatorBar" style={styles.topIndicatorBarStyle}>
              <TopIndicatorBar />
            </View>
          )}
          {title || closeButtonIcon ? (
            <View style={styles.headerContainer}>
              <Label
                id="title"
                variant={variants.titleM}
                text={title ?? ''}
                style={styles.headerLabel}
              />
              {closeButtonIcon && (
                <Pressable
                  style={styles.cancelButtonContainer}
                  onPress={onClose}>
                  <CancelIcon
                    size="16"
                    color={theme.colors['icon-interactive-secondary-enabled']}
                  />
                </Pressable>
              )}
            </View>
          ) : (
            <></>
          )}
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

export {CustomBottomSheet as BottomSheet};
