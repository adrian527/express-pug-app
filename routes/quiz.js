const express = require("express");
const router = express.Router();
const Quiz = require("../models/quiz.js");

/* GET home page. */
router.get("/", async (req, res) => {
  // await new Quiz({
  //   title: "Pytanie 1",
  //   vote: 0,
  // }).save();
  const show = !req.session.vote;

  const data = await Quiz.find();

  res.render("quiz", { title: "Quiz", data, show });
});

router.post("/", async (req, res) => {
  // await new Quiz({
  //   title: "Pytanie 1",
  //   vote: 0,
  // }).save();
  const id = req.body.quiz;

  const data = await Quiz.findOne({ _id: id });
  data.vote = data.vote + 1;
  await data.save();
  req.session.vote = 1;
  res.redirect("/quiz");
});

module.exports = router;
