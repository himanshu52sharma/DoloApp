import {useEffect} from 'react';
import {LogBox, StyleSheet, Text} from 'react-native';

import {RootNavigator} from './src/navigation/RootNavigator';
//import {Fonts} from './src/theme';
import Fonts from './src/theme/Fonts';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/redux/store';
import {MenuProvider} from 'react-native-popup-menu';
import FlashMessage from 'react-native-flash-message';
import {
  MD3LightTheme as DarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

let {store, persistor} = configureStore();

const App = () => {
  LogBox.ignoreAllLogs();

  const styles = StyleSheet.create({
    defaultFontFamily: {
      fontFamily: Fonts.primaryRegular,
    },
  });

  

  // const theme = {
  //   ...DefaultTheme,
  //   colors:"rgb(30, 26, 29)", // Copy it from the color codes scheme and then use it here
  // };


  // const customProps = {style: styles.defaultFontFamily};

  // // To set default font family, avoiding issues with specific android fonts like OnePlus Slate
  // function setDefaultFontFamily() {
  //   const TextRender = Text.render;
  //   const initialDefaultProps = Text.defaultProps;
  //   Text.defaultProps = {
  //     ...initialDefaultProps,
  //     ...customProps,
  //   };
  //   Text.render = function render(props) {
  //     let oldProps = props;
  //     props = {...props, style: [customProps.style, props.style]};
  //     try {
  //       return TextRender.apply(this, arguments);
  //     } finally {
  //       props = oldProps;
  //     }
  //   };
  // }

  // useEffect(() => {
  //   setDefaultFontFamily();
  //   SplashScreen.hide();
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MenuProvider>
          <RootNavigator/>
          <FlashMessage position="top" />
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
