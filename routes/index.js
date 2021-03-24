const express = require("express");
const music = require("./music");

const router = express.Router();

router.use("/api/v1/music", music);

router.get("/", (req, res) => {
    return res.render("index", {
        "title": "music sheet"
    });
});

module.exports = router;
