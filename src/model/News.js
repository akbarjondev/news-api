const { fetch } = require("./../db/db");

class News {
  async get() {
    try {
      let sql = `select * from news;`;
      const data = await fetch(sql);
      let news = await data;

      return {
        data: news,
        message: "get all news",
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
      };
    }
  }

  async create(...inputs) {
    try {
      const sql = `insert into news(news_title, news_desc, news_picture)
                    values($1, $2, $3) returning *;`;
      const [data] = await fetch(sql, inputs);

      return {
        data: data,
        message: "add news",
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
      };
    }
  }

  async edit(...inputs) {
    try {
      const sql = `update news set news_title=$2, news_desc=$3, news_picture=$4 where news_id=$1 returning *;`;
      const [data] = await fetch(sql, inputs);

      return {
        data: data,
        message: "edit news",
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
      };
    }
  }

  async delete(...inputs) {
    try {
      const sql = `delete from news where news_id=$1 returning *;`;
      const [data] = await fetch(sql, inputs);

      return {
        data: data,
        message: "delete news",
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
      };
    }
  }

  async addLoved(...inputs) {
    try {
      const sql = `insert into loved(loved_news_id, loved_user_id) values($1, $2) returning *;`;
      const [data] = await fetch(sql, inputs);

      return {
        data: data,
        message: "add loved news",
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
      };
    }
  }

  async checkLoved(...inputs) {
    try {
      const sql = `select * from loved where loved_news_id=$1 and loved_user_id=$2;`;
      const [data] = await fetch(sql, inputs);

      return {
        data: data ? data : null,
        message: "check loved news by user",
      };
    } catch (error) {
      return {
        data: null,
        message: error.message,
      };
    }
  }
}

module.exports = News;
