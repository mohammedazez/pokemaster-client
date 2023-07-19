import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  // USER_INFO,
} from "../actionsType/userType";

const token = localStorage.getItem("accessToken");
// console.log("ini token", token);

const initialState = token
  ? {
      isLogged: true,
      data: [],
      error: null,
    }
  : {
      isLogged: false,
      data: [],
      error: null,
    };

// console.log("ini initialState", initialState);

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return {
        registerData: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLogged: false,
      };
    // case USER_INFO:
    //   return {
    //     ...state,
    //     data: action.payload,
    //   };
    default:
      return state;
  }
};

export default userReducer;
