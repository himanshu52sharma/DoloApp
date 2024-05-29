import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import {Color, Dimension, Fonts} from '../../theme';
import {Button, HelperText, TextInput} from 'react-native-paper';
// import {postData} from '../../API';

export default function ForgetPass(props) {
  const [view, setView] = React.useState('');
  const [isEmailShow, setIsEmailShow] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [mobileNo, setMobileNo] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [otpError, setOtpError] = React.useState(false);

  const [realOTP, setRealOTP] = React.useState('');

  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [showNewPass, setShowNewPass] = React.useState(true);
  const [showConfirmPass, setShowConfirmPass] = React.useState(true);

  const [checkLoading, setCheckLoading] = React.useState(false);

  const checkUser = async () => {
    setCheckLoading(true);
    if (isEmailShow && email === '') {
      setCheckLoading(false);
      return ToastAndroid.show(
        'Please enter a valid email',
        ToastAndroid.SHORT,
      );
    } else {
      let otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp);
      setRealOTP(otp);
      let body = {
        type: isEmailShow ? 'mail' : 'mobileno',
        email,
        otp,
        mobile: mobileNo,
      };
      // let result = await postData('api/getForget', body);
      // if (result.success) {
        setCheckLoading(false);
        setView('otp');
      // } else {
      //   setCheckLoading(false);
      //   ToastAndroid.show(
      //     'Something Went Wrong! Please Try Again',
      //     ToastAndroid.SHORT,
      //   );
      // }
    }
  };

  const checkOTP = () => {
    if (otp != realOTP) {
      return setOtpError(true);
    }
    setView('password');
  };

  const isValidPassword = () => {
    if (newPassword.length) return newPassword.length < 8;
  };

  const checkConfirmPass = () => {
    return confirmPassword.length && newPassword != confirmPassword;
  };

  const changePassword = () => {
    ToastAndroid.show('Password changed successfully', ToastAndroid.SHORT);
    props.onClose();
  };

  const checkSubmitStatus = () => {
    if (newPassword.length > 0 && confirmPassword.length > 0) {
      return isValidPassword() || checkConfirmPass();
    }
    return true;
  };

  const checkEmail = () => {
    let emailTestReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.length > 0 && !emailTestReg.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const errorTextStatus = () => {
    if (isEmailShow) {
      return checkEmail();
    } else {
      return mobileNo.length > 10;
    }
  };

  const checkBtnStatus = () => {
    if (isEmailShow) {
      return checkEmail();
    } else {
      return mobileNo.length != 10;
    }
  };

  const sheetView = () => {
    switch (view) {
      case '':
        return (
          <View style={{margin: 10}}>
            <Text style={styles.label}>Enter your mobile number</Text>
            {isEmailShow ? (
              <TextInput
                mode="outlined"
                label="Email ID"
                value={email}
                autoFocus
                outlineColor={'#ccc'}
                error={checkEmail()}
                onChangeText={text => {
                  setEmail(text);
                }}
                activeOutlineColor={Color.secondary}
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
              />
            ) : (
              <TextInput
                mode="outlined"
                label="Mobile Number"
                value={mobileNo}
                autoFocus
                outlineColor={'#ccc'}
                error={mobileNo.length > 10}
                onChangeText={text => {
                  setMobileNo(text);
                }}
                keyboardType="number-pad"
                activeOutlineColor={Color.secondary}
                style={styles.input}
                left={<TextInput.Icon icon="phone" />}
              />
            )}
            <HelperText
              padding="none"
              type="error"
              visible={errorTextStatus()}
              style={{display: errorTextStatus() ? 'flex' : 'none'}}>
              {isEmailShow
                ? 'Invalid Email Id'
                : 'Mobile Number should not be more than 10 digits !'}
            </HelperText>
            <TouchableOpacity onPress={() => setIsEmailShow(prev => !prev)}>
              <Text
                style={{
                  marginVertical: 15,
                  marginHorizontal: 5,
                  textAlign: 'right',
                }}>
                {isEmailShow
                  ? 'Use Mobile Number instead ?'
                  : 'Use Email id instead ?'}
              </Text>
            </TouchableOpacity>
            <Button
              // icon="refresh"
              onPress={() => checkUser()}
              loading={checkLoading}
              disabled={checkBtnStatus()}
              color={Color.secondary}
              style={{color: Color.primary, marginTop: 10}}
              contentStyle={{
                height: 55,
                alignItems: 'center',
              }}
              mode="contained">
              Verify
            </Button>
          </View>
        );
      case 'otp':
        return (
          <View style={{margin: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.label}>
                {isEmailShow
                  ? `OTP sent to ${email}`
                  : `OTP sent to +91-${mobileNo}`}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setView('');
                }}>
                <Text
                  style={{
                    ...styles.label,
                    color: Color.secondary,
                    fontSize: 14,
                    fontFamily: Fonts.secondaryBold,
                  }}>
                  Change ?
                </Text>
              </TouchableOpacity>
            </View>
            <OTPTextView
              autoFocus
              handleTextChange={text => {
                setOtp(text);
                setOtpError(false);
              }}
              containerStyle={{
                marginTop: 10,
              }}
              textInputStyle={{
                borderColor: otpError ? Color.red : Color.white,
                color: Color.white,
              }}
              inputCount={4}
              offTintColor={otpError ? Color.error : Color.graylight}
              tintColor={otpError ? Color.error : Color.secondary}
            />
            <HelperText
              padding="none"
              type="error"
              visible={otpError}
              style={{display: otpError ? 'flex' : 'none'}}>
              Invalid OTP !
            </HelperText>
            <Button
              onPress={() => checkOTP()}
              style={{backgroundColor: Color.secondary, marginTop: 20}}
              contentStyle={{
                height: 55,
                alignItems: 'center',
              }}
              mode="contained">
              Verify
            </Button>
          </View>
        );
      case 'password':
        return (
          <View style={{margin: 10}}>
            <Text style={styles.label}>Enter New Password</Text>
            <TextInput
              mode="outlined"
              secureTextEntry={showNewPass}
              right={
                <TextInput.Icon
                  icon={showNewPass ? 'eye-off' : 'eye'}
                  onPress={() => setShowNewPass(prev => !prev)}
                />
              }
              left={<TextInput.Icon icon="key" />}
              value={newPassword}
              autoFocus
              outlineColor={'#ccc'}
              error={isValidPassword()}
              onChangeText={text => {
                setNewPassword(text);
              }}
              activeOutlineColor={Color.secondary}
              style={styles.input}
              label="New Password"
            />
            <HelperText
              padding="none"
              type="error"
              visible={isValidPassword()}
              style={{display: isValidPassword() ? 'flex' : 'none'}}>
              Password must be atleast of 8 digits !
            </HelperText>
            <TextInput
              mode="outlined"
              value={confirmPassword}
              secureTextEntry={showConfirmPass}
              right={
                <TextInput.Icon
                  icon={showConfirmPass ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPass(prev => !prev)}
                />
              }
              left={<TextInput.Icon icon="key" />}
              outlineColor={'#ccc'}
              error={checkConfirmPass()}
              onChangeText={text => setConfirmPassword(text)}
              activeOutlineColor={Color.secondary}
              style={styles.input}
              label="Confirm Password"
            />
            <HelperText
              padding="none"
              type="error"
              visible={checkConfirmPass()}
              style={{display: checkConfirmPass() ? 'flex' : 'none'}}>
              Passwords don't match !
            </HelperText>
            <Button
              onPress={() => changePassword()}
              // loading={loading}
              disabled={checkSubmitStatus()}
              color={Color.secondary}
              style={{marginTop: 20}}
              contentStyle={{
                height: 55,
                alignItems: 'center',
              }}
              mode="contained">
              Change Password
            </Button>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>Forget Password</Text>
      </View>
      {sheetView()}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.secondaryRegular,
    fontSize: 14,
    color: Color.grey,
    // marginVertical: 10,
  },
  input: {
    fontFamily: Fonts.secondaryMedium,
    fontSize: 16,
    marginTop: 10,
  },
  container: {
    flex: 1,
    width: Dimension.window.width,
    // alignItems: 'center',
    padding: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    fontFamily: Fonts.secondaryBold,
    color: Color.secondary,
    padding: 10,
  },
  searchContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Color.primary,
    padding: 8,
  },
});
