const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const parser = require("body-parser");
const User = require("./src/model/User");
const News = require("./src/model/News");
const app = express();

const user = new User();
const news = new News();

app.use(parser.json());
app.use(cors());

// middleware for token verifying
app.use((req, res, next) => {
  const { headers, url } = req;
  let listOfPrivateUrls = ["/login", "/register", "/news"];

  if (!listOfPrivateUrls.includes(url)) {
    const token = headers.bearer;

    try {
      jwt.verify(token, process.env.KEY);

      next();
    } catch (err) {
      res.status(401).json({
        data: null,
        message: "Qayta login qiling. " + err.message,
      });
    }
  } else {
    next();
  }
});

// news
app.get("/news", async function (req, res) {
  try {
    const result = await news.get();

    if (result.data) {
      res.status(200).json(result);
    }

    res.status(401).json(result);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/news/add", async function (req, res) {
  try {
    const { title, desc, picture } = req.body;
    const result = await news.create(title, desc, picture);

    if (result.data) {
      res.status(200).json(result);
    }

    res.status(500).json(result);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/news/edit", async function (req, res) {
  try {
    const { id, title, desc, picture } = req.body;
    const result = await news.edit(id, title, desc, picture);

    if (result.data) {
      res.status(200).json(result);
    }

    res.status(500).json(result);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/news/delete", async function (req, res) {
  try {
    const { id } = req.body;
    const result = await news.delete(id);

    if (result.data) {
      res.status(200).json(result);
    }

    res.status(500).json(result);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/news/add-loved", async function (req, res) {
  try {
    const { news_id, user_id } = req.body;
    const result = await news.addLoved(news_id, user_id);

    if (result.data) {
      res.status(200).json(result);
    }

    res.status(500).json(result);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/news/check-loved", async function (req, res) {
  try {
    const { news_id, user_id } = req.body;
    const result = await news.checkLoved(news_id, user_id);

    if (result.data) {
      res.status(200).json(result);
    }

    res.status(500).json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// login
app.post("/login", async function (req, res) {
  try {
    const { login, password } = req.body;
    const result = await user.login(login, password);

    if (result.data) {
      res.status(200).json(result);
    }

    res.status(401).json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// register
app.post("/register", async function (req, res) {
  try {
    const { login, password, fullname } = req.body;

    if (!login && !password && !fullname) {
      res.status(411).json({
        data: null,
        message: "Barcha ma'lumotlarni kiriting",
      });
    }

    // check if login exist
    let exist = await user.findOne(login);

    if (!exist) {
      // if login not exist create new
      const result = await user.register(fullname, login, password);

      if (result.data) {
        res.status(200).json(result);
      }

      res.status(410).json(result);
    } else {
      res.status(411).json({
        data: null,
        message: "Bunday login mavjud",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`server ready at http://localhost:4001 🚀`));
