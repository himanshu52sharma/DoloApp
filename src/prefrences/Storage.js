import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLanguage =async value=>{
  try{
    await AsyncStorage.setItem('@lngtype',JSON.stringify(value));

  }catch(e){}
}



export const getLngType = async () => {
  try {
    const tng = await AsyncStorage.getItem('@lngtype');
    return tng;
  } catch (e) {}
};





export const storeUserType = async value => {
  try {
    await AsyncStorage.setItem('@userType', value);
  } catch (e) {}
};

export const getUserType = async () => {
  try {
    const onBoarding = await AsyncStorage.getItem('@userType');
    return onBoarding;
  } catch (e) {}
};

export const storeUserId = async value => {
  try {
    await AsyncStorage.setItem('@userId', value);
  } catch (e) {}
};

export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('@userId');
    return userId;
  } catch (e) {}
};

export const storeUserRoleId = async value => {
  try {
    await AsyncStorage.setItem('@userRoleId', value);
  } catch (e) {}
};

export const getUserRoleId = async () => {
  try {
    const userRoleId = await AsyncStorage.getItem('@userRoleId');
    return userRoleId;
  } catch (e) {}
};

export const storeUserToken = async value => {
  try {
    await AsyncStorage.setItem('@accessToken', value);
  } catch (e) {}
};

export const getUserToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('@accessToken');
    return accessToken;
  } catch (e) {}
};

export const storeCategoryId = async value => {
  try {
    await AsyncStorage.setItem('@categoryId', value);
  } catch (e) {}
};

export const getCategoryId = async () => {
  try {
    const categoryId = await AsyncStorage.getItem('@categoryId');
    return categoryId;
  } catch (e) {}
};

export const storeSubCategoryId = async value => {
  try {
    await AsyncStorage.setItem('@subCategoryId', value);
  } catch (e) {}
};

export const getSubCategoryId = async () => {
  try {
    const subCategoryId = await AsyncStorage.getItem('@subCategoryId');
    return subCategoryId;
  } catch (e) {}
};

export const storeCountryId = async value => {
  try {
    await AsyncStorage.setItem('@countryId', value);
  } catch (e) {}
};

export const getCountryId = async () => {
  try {
    const countryId = await AsyncStorage.getItem('@countryId');
    return countryId;
  } catch (e) {}
};

export const storeProvinceId = async value => {
  try {
    await AsyncStorage.setItem('@provinceId', value);
  } catch (e) {}
};
export const getProvinceId = async () => {
  try {
    const provinceId = await AsyncStorage.getItem('@provinceId');
    return provinceId;
  } catch (e) {}
};


export const storeSocialLoginType = async value => {
  try {
    await AsyncStorage.setItem('@socialType', value);
  } catch (e) {}
};
export const getSocialLoginType = async () => {
  try {
    const provinceId = await AsyncStorage.getItem('@socialType');
    return provinceId;
  } catch (e) {}
};

export const storeUserProvinceId = async value => {
  try {
    await AsyncStorage.setItem('@userProvinceId', value);
  } catch (e) {}
};
export const getUserProvinceId = async () => {
  try {
    const provinceId = await AsyncStorage.getItem('@userProvinceId');
    return provinceId;
  } catch (e) {}
};

export const storeEmail = async value => {
  try {
    await AsyncStorage.setItem('@email', value);
  } catch (e) {}
};

export const getEmail = async () => {
  try {
    const onBoarding = await AsyncStorage.getItem('@email');
    return onBoarding;
  } catch (e) {}
};

export const storePassword = async value => {
  try {
    await AsyncStorage.setItem('@password', value);
  } catch (e) {}
};

export const getPassword = async () => {
  try {
    const onBoarding = await AsyncStorage.getItem('@password');
    return onBoarding;
  } catch (e) {}
};

export const storeRememberMe = async value => {
  try {
    await AsyncStorage.setItem('@rememberMe', value);
  } catch (e) {}
};

export const getRememberMe = async () => {
  try {
    const onBoarding = await AsyncStorage.getItem('@rememberMe');
    return onBoarding;
  } catch (e) {}
};

export const storeMinPrice = async value => {
  try {
    await AsyncStorage.setItem('@minPrice', value);
  } catch (e) {}
};

export const getMinPrice = async () => {
  try {
    const minPrice = await AsyncStorage.getItem('@minPrice');
    return minPrice;
  } catch (e) {}
};

export const storeMaxPrice = async value => {
  try {
    await AsyncStorage.setItem('@maxPrice', value);
  } catch (e) {}
};

export const getMaxPrice = async () => {
  try {
    const maxPrice = await AsyncStorage.getItem('@maxPrice');
    return maxPrice;
  } catch (e) {}
};

export const storeHelpGuideStatus = async value => {
  try {
    await AsyncStorage.setItem('@helpGuideStatus', value);
  } catch (e) {}
};

export const getHelpGuideStatus = async () => {
  try {
    const helpGuideStatus = await AsyncStorage.getItem('@helpGuideStatus');
    return helpGuideStatus;
  } catch (e) {}
};

export const storeAdvertiserHelpGuideStatus = async value => {
  try {
    await AsyncStorage.setItem('@AdvertiserHelpGuideStatus', value);
  } catch (e) {}
};

export const getAdvertiserHelpGuideStatus = async () => {
  try {
    const AdvertiserHelpGuideStatus = await AsyncStorage.getItem('@AdvertiserHelpGuideStatus');
    return AdvertiserHelpGuideStatus;
  } catch (e) {}
};




export const resetall = async () => {
  try {
    let remember_me = await getRememberMe();
    let advertiserStatus = await getAdvertiserHelpGuideStatus(); //Advertiser
    let helpGuideStatus = await getHelpGuideStatus(); //visitor

    if (remember_me === 'true') {
      let email_id = await getEmail();
      let pwd = await getPassword();
      let rememberMe = await getRememberMe();

      await AsyncStorage.clear();
      await storeEmail(email_id);
      await storePassword(pwd);
      await storeRememberMe(rememberMe)

    } else {
      await AsyncStorage.clear();
    }

    await storeHelpGuideStatus(helpGuideStatus)
    await storeAdvertiserHelpGuideStatus(advertiserStatus)


  } catch (e) {}
};
