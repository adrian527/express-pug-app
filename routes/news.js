const express = require("express");
const router = express.Router();
const News = require("../models/news");
/* GET home page. */
router.get("/", async (req, res) => {
  const search = req.query.search;

  const data = await News.find(
    !!search
      ? {
          title: new RegExp(search, "i"),
        }
      : {}
  ).sort({
    created: -1,
  });
  res.render("news", { title: "News", data, search });
});

module.exports = router;
