const { fetch } = require("./../db/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class User {
  async login(login, password) {
    const sql = `select * from users where user_login=$1 and user_password=$2;`;
    const data = await fetch(sql, [login, password]);
    let [userData] = await data;

    if (userData && Object.entries(userData).length > 0) {
      let token = jwt.sign(
        {
          user_id: userData.user_id,
          user_fullname: userData.user_fullname,
        },
        process.env.KEY,
        { expiresIn: "3h" }
      );

      return {
        data: {
          user_id: userData.user_id,
          user_fullname: userData.user_fullname,
        },
        message: "Успешно авторизовался",
        token,
      };
    } else {
      return {
        data: null,
        message: "Имя пользователя или пароль введены не верно",
      };
    }
  }

  async findOne(login) {
    const sql = `select user_id from users where user_login=$1`;
    const [data] = await fetch(sql, [login]);

    return data ? true : false;
  }

  async register(fullname, login, password) {
    const sql = `insert into 
      users(user_fullname, user_login, user_password) 
      values($1, $2, $3) returning user_fullname;`;

    const data = await fetch(sql, [fullname, login, password]);
    let [userData] = await data;

    if (userData && Object.entries(userData).length > 0) {
      return {
        data: { fullname: userData.user_fullname },
        message: "Ro'yhatdan o'tildi",
      };
    } else {
      return {
        data: null,
        message: "Ro'yhatdan o'tishda xatolik",
      };
    }
  }
}

module.exports = User;
