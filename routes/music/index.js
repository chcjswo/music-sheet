const express = require("express");

const router = express.Router();
const ctrl = require("./music.ctrl");

router.get("/", ctrl.list);
router.post("/", ctrl.create);
// router.delete("/", ctrl.removeLunch);

module.exports = router;
