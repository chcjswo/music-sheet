const express = require("express");

const router = express.Router();
const ctrl = require("./music.ctrl");

router.get("/", ctrl.list);
router.post("/", ctrl.create);
router.delete("/:id", ctrl.removeSheet);
router.post("/entrance", ctrl.entranceRoom);

module.exports = router;
