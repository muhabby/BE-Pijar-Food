/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require("uuid");
const { otpGen } = require("otp-gen-agent");
const {
  inputUsersModel,
  getUsersByEmailModel,
  activatedUserModel,
  otpRequestModel,
} = require("../model/auth");
const { showUsersByIdModel, updateUsersModel } = require("../model/users");
const argon2 = require("argon2");
const { GenerateToken } = require("../helper/token");
const { sendEmailActivated, sendEmailOTP } = require("../helper/email");

const AuthController = {
  register: async (req, res, next) => {
    try {
      let { full_name, email, password } = req.body;

      //Check column is filled or not
      if (
        !full_name ||
        full_name == "" ||
        !email ||
        email == "" ||
        !password ||
        password == ""
      ) {
        return res
          .status(404)
          .json({ status: 404, message: "Please fill in all required fields" });
      }

      let user = await getUsersByEmailModel(email);

      // Check email
      if (user.rowCount === 1) {
        return res.status(404).json({
          status: 404,
          message: "Email is already registered, please login",
        });
      }

      // Process
      password = await argon2.hash(password);

      let data = {
        id: uuidv4(),
        full_name,
        email,
        password,
        otp_verif: await otpGen(),
      };

      let url = `http://localhost:3000/auth/activated/${data.id}/${data.otp_verif}`;

      let sendOTP = await sendEmailActivated(email, url, full_name);

      if (!sendOTP) {
        return res
          .status(404)
          .json({ status: 404, messages: "Register failed when send email" });
      }

      let result = await inputUsersModel(data);
      res.status(200).json({
        status: 200,
        message: "Register success, please check your email for activation",
      });
    } catch (err) {
      console.log("Register Error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Register Controller Error" });
    }
  },

  verification: async (req, res, next) => {
    let { id, otp } = req.params;

    // Check users
    let user = await showUsersByIdModel(id);
    if (user.rowCount === 0) {
      return res
        .status(404)
        .json({ status: 404, messages: "Email not register" });
    }

    let userData = user.rows[0];

    if (otp !== userData.otp_verif) {
      return res.status(404).json({ status: 404, messages: "OTP invalid" });
    }

    let activated = await activatedUserModel(id);

    if (!activated) {
      return res
        .status(404)
        .json({ status: 404, messages: "Account verification failed" });
    }

    return res.status(200).json({
      status: 200,
      messages: "Account verification success, please login",
    });

    // return res.redirect("https://pijar-food.vercel.app/login");
  },

  login: async (req, res, next) => {
    try {
      let { email, password } = req.body;

      //Check column is filled or not
      if (!email || !password || email == "" || password == "") {
        return res
          .status(404)
          .json({ status: 404, message: "Please fill in all required fields" });
      }

      // Check email
      let user = await getUsersByEmailModel(email);
      if (user.rowCount === 0) {
        return res
          .status(404)
          .json({ status: 404, message: "Users not found or id invalid" });
      }

      let userData = user.rows[0];
      console.log(userData);

      // Check verif
      if (userData.is_verif === false) {
        return res
          .status(404)
          .json({ status: 404, message: "Email not verified" });
      }

      let isVerify = await argon2.verify(userData.password, password);

      // Check password
      if (!isVerify) {
        console.log("argon password :" + userData.password);
        console.log("users password :" + user.password);
        return res
          .status(404)
          .json({ status: 404, message: "Incorrect password" });
      }

      console.log(userData);

      delete userData.password;
      let token = GenerateToken(userData);

      return res
        .status(200)
        .json({ status: 200, message: "Login success", token, data: userData });
    } catch (err) {
      console.log("Register Error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "Register Controller Error" });
    }
  },

  otpRequest: async (req, res, next) => {
    try {
      let { email } = req.body;

      //Check column is filled or not
      if (!email || email == "") {
        return res
          .status(404)
          .json({ status: 404, message: "Please enter your email" });
      }

      // Check email
      let user = await getUsersByEmailModel(email);
      if (user.rowCount === 0) {
        return res
          .status(404)
          .json({ status: 404, message: "Email not registered" });
      }

      let data = {
        email,
        otp_verif: await otpGen(),
      };

      let userData = user.rows[0];

      // Send OTP to email
      let otp = data.otp_verif;
      let sendOTP = await sendEmailOTP(email, otp, userData.full_name);

      if (!sendOTP) {
        return res
          .status(404)
          .json({ status: 404, messages: "Register failed when send email" });
      }

      let result = await otpRequestModel(data);
      res.status(200).json({
        status: 200,
        message: "OTP has been sent, please check your email",
      });
    } catch (err) {
      console.log("otpRequest Error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "otpRequest Controller Error" });
    }
  },

  otpInput: async (req, res, next) => {
    try {
      let { email, otp_verif } = req.body;

      //Check column is filled or not
      if (!email || !otp_verif || email == "" || otp_verif == "") {
        return res
          .status(404)
          .json({ status: 404, message: "Please fill in all required fields" });
      }

      // Check email
      let user = await getUsersByEmailModel(email);
      if (user.rowCount === 0) {
        return res
          .status(404)
          .json({ status: 404, message: "Email not registered" });
      }

      let userData = user.rows[0];

      // Check if otp input same with otp_verif
      if (otp_verif !== userData.otp_verif) {
        return res.status(404).json({ status: 404, messages: "OTP invalid" });
      }

      //Generate token
      let token = GenerateToken(userData);

      return res.status(200).json({
        status: 200,
        message: "OTP Input success",
        token,
        data: userData,
      });
    } catch (err) {
      console.log("otpInput Error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "otpInput Controller Error" });
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      let { newPassword, confirmPassword } = req.body;

      // Check token
      if (!req.payload) {
        return res
        .status(404)
        .json({ code: 404, message: "Server need token, please login" });
      }
      
      // Check params and body
      let id = req.payload.id;
      if (id === "") {
        return res.status(404).json({ message: "Params id invalid" });
      }

      //Check column is filled or not
      if (
        !newPassword ||
        !confirmPassword ||
        newPassword == "" ||
        confirmPassword == ""
      ) {
        return res
          .status(404)
          .json({ status: 404, message: "Please fill in all required fields" });
      }

      // Check Users
      let users = await showUsersByIdModel(id);
      let resultUsers = users.rows;
      if (!resultUsers.length) {
        return res
          .status(404)
          .json({ message: "Users not found or id invalid" });
      }

      // Check if id users and id token same or not
      let oldUsers = resultUsers[0];
      if (req.payload.id !== oldUsers.id) {
        console.log(`id_token = ${req.payload.id}`);
        console.log(`id_user = ${oldUsers.id}`);
        return res
          .status(404)
          .json({ code: 404, message: "This is not your account" });
      }

      // Check if password and confirm password match or not
      if (newPassword !== confirmPassword) {
        return res.status(404).json({
          code: 404,
          message:
            "Passwords don't match, make sure both password fields match",
        });
      }

      // Process
      let data = {
        id,
        full_name: oldUsers.full_name,
        email: oldUsers.email,
        password: newPassword || oldUsers.password,
        bio: oldUsers.bio,
        profile_picture: oldUsers.profile_picture,
    }

      if (newPassword !== "") {
        data.password = await argon2.hash(newPassword);
      }

      let result = await updateUsersModel(data);
      if (result.rowCount === 1) {
        return res
          .status(200)
          .json({ code: 200, message: "Success update password" });
      }
    } catch (err) {
      console.log("resetPassword Error");
      console.log(err);
      return res
        .status(404)
        .json({ code: 404, message: "resetPassword Controller Error" });
    }
  },
};

module.exports = AuthController;
