const express = require("express");
const router = express.Router();
const News = require("../models/news");

router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("login");

    return;
  }

  next();
});

/* GET home page. */
router.get("/", async (req, res) => {
  // const newsData = new News({
  //   title: "Tytuł testowy",
  //   description: "Opis",
  // });

  // newsData.save();
  const data = await News.find({});
  console.log(data);
  res.render("admin/index", { title: "Admin", data });
});

router.get("/news/add", (req, res) => {
  res.render("admin/news-form", { title: "Admin" });
});

router.post("/news/add", (req, res) => {
  const body = req.body;

  const newsData = new News(body);

  const errors = newsData.validateSync();
  if (!errors) {
    try {
      newsData.save();
      res.redirect("/admin");
    } catch (_) {
      res.render("admin/news-form", { title: "Admin", body, errors });
    }
  }

  res.render("admin/news-form", { title: "Admin", body, errors });
});

router.get("/news/delete/:id", async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (_) {}
});

module.exports = router;
