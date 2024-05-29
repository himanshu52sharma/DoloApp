import {showMessage} from 'react-native-flash-message';
import Fonts from '../../theme/Fonts';


export const successToast = (title, subTitle) => {
  showMessage({
    message: title,
    description: subTitle,
    icon: 'auto',
    type: 'success',
    titleStyle: {
      fontFamily: Fonts.primarySemiBold,
    },
    textStyle: {
      fontFamily: Fonts.primaryRegular,
    },
  });
};


export const errorToast = (title, subTitle) => {
  showMessage({
    message: title,
    description: subTitle,
    type: 'danger',
    icon: 'auto',
    titleStyle: {
      fontFamily: Fonts.primarySemiBold,
    },
    textStyle: {
      fontFamily: Fonts.primaryRegular,
    },
  });
};

export const infoToast = (title, subTitle) => {
  showMessage({
    message: title,
    description: subTitle,
    type: 'info',
    icon: 'auto',
    titleStyle: {
      fontFamily: Fonts.primarySemiBold,
    },
    textStyle: {
      fontFamily: Fonts.primaryRegular,
    },
  });
};

export const warnToast = (title, subTitle) => {
  showMessage({
    message: title,
    description: subTitle,
    type: 'warning',
    icon: 'auto',
    titleStyle: {
      fontFamily: Fonts.primarySemiBold,
    },
    textStyle: {
      fontFamily: Fonts.primaryRegular,
    },
  });
};
