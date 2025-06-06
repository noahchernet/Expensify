import React, {useRef} from 'react';
import {PanResponder, View} from 'react-native';
import CONST from '@src/CONST';
import type SwipeableViewProps from './types';

function SwipeableView({children, onSwipeDown}: SwipeableViewProps) {
    const minimumPixelDistance = CONST.COMPOSER_MAX_HEIGHT;
    const oldYRef = useRef(0);
    const panResponder = useRef(
        // eslint-disable-next-line react-compiler/react-compiler
        PanResponder.create({
            // The PanResponder gets focus only when the y-axis movement is over minimumPixelDistance & swipe direction is downwards
            onMoveShouldSetPanResponderCapture: (_event, gestureState) => {
                if (gestureState.dy - oldYRef.current > 0 && gestureState.dy > minimumPixelDistance) {
                    return true;
                }
                oldYRef.current = gestureState.dy;
                return false;
            },

            // Calls the callback when the swipe down is released; after the completion of the gesture
            onPanResponderRelease: onSwipeDown,
        }),
    ).current;

    // eslint-disable-next-line react/jsx-props-no-spreading, react-compiler/react-compiler
    return <View {...panResponder.panHandlers}>{children}</View>;
}

SwipeableView.displayName = 'SwipeableView';

export default SwipeableView;
