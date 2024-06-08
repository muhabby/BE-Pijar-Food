const Pool = require("../config/db");

const getUsersByEmailModel = async (email) => {
  console.log("model - getUsersByEmail");
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
      if (!err) {
        return resolve(res);
      } else {
        console.log("error db -", err);
        reject(err);
      }
    })
  );
};

const inputUsersModel = async (data) => {
  console.log("model - getUsersByEmail");
  let { id, full_name, email, password, otp_verif, profile_picture } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `
        INSERT INTO 
                users (id, full_name, email, password, created_at, otp_verif, is_verif, profile_picture)
        VALUES
                ('${id}', '${full_name}', '${email}', '${password}', NOW(), '${otp_verif}', true, '${profile_picture}');
        `,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          console.log("error db -", err);
          reject(err);
        }
      }
    )
  );
};

const activatedUserModel = async (id) => {
  console.log("model - activatedUser");
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET is_verif=true WHERE id='${id}'`,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          console.log(`error db -`, err);
          reject(err);
        }
      }
    )
  );
};

const otpRequestModel = async (data) => {
  console.log("model - getUsersById");
  let { email, otp_verif } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET otp_verif='${otp_verif}' WHERE email='${email}'`,
      (err, res) => {
        if (!err) {
          return resolve(res);
        } else {
          console.log("error db -", err);
          reject(err);
        }
      }
    )
  );
};

module.exports = {
  getUsersByEmailModel,
  inputUsersModel,
  activatedUserModel,
  otpRequestModel,
};
