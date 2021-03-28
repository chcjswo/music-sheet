const express = require("express");

const router = express.Router();
const ctrl = require("./music.ctrl");

router.get("/", ctrl.list);
router.post("/", ctrl.create);
router.delete("/:id", ctrl.removeSheet);

module.exports = router;
