import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  // USER_INFO,
} from "../actionsType/userType";
import axios from "../../APIs/userApi";
import Swal from "sweetalert2";

export const setRegisterActions =
  (values, event, history) => async (dispatch) => {
    event.preventDefault();
    try {
      const checkEmail = await axios({
        method: "get",
        url: "/users",
        data: values,
      });
      let dataUser = checkEmail.data.filter(
        (item) => item.email === values.email
      );
      if (dataUser.length > 0) {
        if (dataUser[0].email === values.email)
          return Swal.fire({
            title: "Email Sudah Terdaftar",
            icon: "warning",
            timer: 3000,
          });
      }

      if (!dataUser.length) {
        const register = await axios({
          method: "post",
          url: "/users",
          data: values,
        });
        dispatch({
          type: USER_REGISTER,
          payload: register.data,
        });

        if (register.data.email !== register.data) {
          Swal.fire({
            title: "Berhasil mendaftar",
            icon: "success",
            timer: 3000,
          });
          history.push("/login");
        } else {
          Swal.fire({
            title: "Gagal Mendaftar",
            icon: "warning",
            timer: 3000,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

export const setLoginActions = (values, event, history) => async (dispatch) => {
  event.preventDefault();
  try {
    const login = await axios({
      method: "get",
      url: "/users",
      data: values,
    });

    let user = login.data.filter((item) => item.email === values.email);
    if (!user.length > 0)
      return Swal.fire({
        title: "Gagal Login",
        icon: "warning",
        timer: 3000,
      });
    if (user[0].email !== values.email)
      return Swal.fire({
        title: "Email Salah",
        icon: "warning",
        timer: 3000,
      });
    if (user[0].password !== values.password)
      return Swal.fire({
        title: "Password Salah",
        icon: "warning",
        timer: 3000,
      });

    if (user[0].password === values.password) {
      localStorage.setItem("accessToken", JSON.stringify(user[0]));
      dispatch({
        type: USER_LOGIN,
        payload: user[0],
      });
      Swal.fire({
        title: "Berhasil Login",
        icon: "success",
        timer: 3000,
      });
      await history.push("/");
      window.location.reload();
    } else {
      Swal.fire({
        title: "Gagal Login",
        icon: "warning",
        timer: 3000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const userLogoutActions = (history) => {
  return (dispatch) => {
    localStorage.removeItem("accessToken");
    dispatch({
      type: USER_LOGOUT,
    });
    history.push("/");
  };
};
