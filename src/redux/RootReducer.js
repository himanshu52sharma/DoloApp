const initialState = {
  user: {},
  isLoggedIn: false,
  isDarkTheme: false,
  book: {},
  info: {},
  language: 'en',
  appointmentType: 'Fresh',
};

export const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DARK_THEME':
      state.isDarkTheme = action.payload;
      return {
        ...state,
        theme: state.isDarkTheme,
      };
    case 'SET_USER':
      state.user = action.payload;
      state.isLoggedIn = true;
      return {
        ...state,
      };
    case 'SET_APPOINTMENT_TYPE':
      state.appointmentType = action.payload;
      return {...state,appointmentType:state.appointmentType};
    case 'LOGOUT':
      state.user = {};
      state.isLoggedIn = false;
      return {
        ...state,
      };

    case 'BOOK':
      state.book = action.payload;
      return {
        ...state,
        book: state.book,
      };

    case 'USER_DETAIL':
      state.info = action.payload;
      return {
        ...state,
        info: state.info,
      };

    case 'SET_LANGUAGE':
      state.language = action.payload;
      return {...state, language: state.language};

    default:
      return state;
  }
};
