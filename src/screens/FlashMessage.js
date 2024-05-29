import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, Fonts} from '../theme';
import {Button, TextInput} from 'react-native-paper';

export default function FlashMessage({navigation, route}) {
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input

  const [msg, setMsg] = React.useState('');

  const onSubmit = () => {
    route.params?.setFlashMsg(msg);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter your announcement. 🔊</Text>
      <View style={{marginTop: 15}}>
        <Text style={styles.label}>Enter message</Text>
        <TextInput
          theme={theme}
          autoFocus
          multiline
          numberOfLines={4}
          onChangeText={text => setMsg(text)}
          value={msg}
          mode="flat"
          underlineColor="#000"
          activeUnderlineColor={Color.primary}
        />
      </View>
      <Button
        style={{
          backgroundColor: Color.primary,
          marginTop: 30,
          marginBottom: 10,
        }}
        contentStyle={{height: 55, alignItems: 'center'}}
        dark
        // loading={loading}
        mode="contained"
        onPress={onSubmit}
      >
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 22,
    color: '#000',
    fontFamily: Fonts.primaryBold,
    width: '100%',
  },
  label: {
    fontFamily: Fonts.primaryRegular,
    color: '#000',
  },
});
