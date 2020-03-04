const router = require("express").Router();
const path = require("path");
router.get("/", (req, res) => {
  // res.status(200).sendFile(path.resolve(__dirname, "../", "index.html"));
  res.status(200).send("connected!");
});

module.exports = router;
