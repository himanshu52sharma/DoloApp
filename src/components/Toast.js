import React, { Component, memo } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
    TouchableOpacity
} from 'react-native';
import {
    WHITE,
    RED,
} from '../constant/Colors';

export const TOAST_ANIMATION_DURATION = 400;

export const durations = {
    LONG: 6000,
    SHORT: 2000
};

const TOAST_BOTTOM = 75;
const TOAST_OPACITY = 1;
const TOAST_BOTTOM_SMALL = 25;

export let showToast = () => { };
export let hideToast = () => { };

class Toast extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            opacity: new Animated.Value(0),
            bottom: new Animated.Value(0),
            text: '',
            right: false,
            rightText: '',
            rightAction: null,
            onHide: null,
            navBar: true,
        };

        showToast = this._showToast;
        hideToast = this._hide;
    }

    _animating = false;
    _hideTimeout = null;
    _showTimeout = null;

    _showToast = ({
        text = '',
        right = false,
        rightText = '',
        rightAction = null,
        onHide = null,
        navBar = true,
    }) => {
        const { visible } = this.state;

        if (visible) {
            clearTimeout(this._hideTimeout);
            this._hideTimeout = setTimeout(() => this._hide(), durations.SHORT);
        }

        this.setState({
            visible: true,
            text,
            right,
            rightText,
            rightAction,
            onHide,
            navBar,
        }, this._show);
    }

    _show = () => {
        clearTimeout(this._showTimeout);
        if (!this._animating) {
            clearTimeout(this._hideTimeout);
            this._animating = true;
            Animated.parallel([
                Animated.timing(this.state.opacity, {
                    toValue: TOAST_OPACITY,
                    duration: TOAST_ANIMATION_DURATION,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false // Add This line
                }),
                Animated.timing(this.state.bottom, {
                    toValue: this.state.navBar ? TOAST_BOTTOM : TOAST_BOTTOM_SMALL,
                    duration: TOAST_ANIMATION_DURATION,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false // Add This line
                }),
            ]).start(({ finished }) => {
                if (finished) {
                    this._animating = !finished;
                    this._hideTimeout = setTimeout(() => this._hide(), durations.SHORT);
                }
            });
        }
    };

    _hide = () => {
        clearTimeout(this._showTimeout);
        clearTimeout(this._hideTimeout);
        if (!this._animating) {
            this._animating = true;
            Animated.parallel([
                Animated.timing(this.state.opacity, {
                    toValue: 0,
                    duration: TOAST_ANIMATION_DURATION,
                    easing: Easing.in(Easing.ease),
                    useNativeDriver: false // Add This line
                }),
                Animated.timing(this.state.bottom, {
                    toValue: 0,
                    duration: TOAST_ANIMATION_DURATION,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: false // Add This line

                }),
            ]).start(({ finished }) => {
                if (finished) {
                    this._animating = false;
                    this._hideCallback();
                }
            });
        }
    };

    _hideCallback = () => {
        if (this.state.onHide) {
            this.state.onHide();
        }

        this.setState({
            visible: false,
            text: '',
            right: false,
            rightText: '',
            rightAction: null,
            onHide: null,
            navBar: true,
        });
    }

    render() {
        const { text, right, rightText, rightAction } = this.state;
        return (this.state.visible || this._animating) ? <Animated.View style={[styles.outer, { opacity: this.state.opacity, bottom: this.state.bottom }]}>
            <View style={[styles.left, right ? styles.rightPadding : null]}>
                <Text style={styles.leftText}>{text}</Text>
            </View>
            {right && <View style={styles.rightOuter}>
                <TouchableOpacity activeOpacity={0.7} onPress={rightAction}>
                    <View style={styles.rightInner}>
                        <Text style={styles.rightText} numberOfLines={2}>{rightText}</Text>
                        <View style={styles.rightLine} />
                    </View>
                </TouchableOpacity>
            </View>}
        </Animated.View> : null;
    }
};

const styles = StyleSheet.create({
    outer: {
        position: 'absolute',
        zIndex: 99,
        backgroundColor: RED,
        borderRadius: 4,
        marginBottom: 10,
        left: 21,
        right: 21,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    left: {
        justifyContent: 'center',
    },
    leftText: {
        fontSize: 16,
        lineHeight: 24,
        color: WHITE,
    },
    rightPadding: {
        width: '60%',
    },
    rightOuter: {
        width: '40%',
        marginRight: -10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    rightInner: {
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    rightLine: {
        position: 'absolute',
        left: 10,
        right: 10,
        marginBottom: 3,
        height: 1,
        backgroundColor: WHITE,
    },
    rightText: {
        fontSize: 14,
        lineHeight: 17,
        color: WHITE,
        textAlign: 'center',
    },
});

export default memo(Toast);

