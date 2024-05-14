import express from "express";

import TodoController from "../controllers/TodoController.js";

const router = express.Router();

router.get("/", TodoController.index);

router.post("/", TodoController.store);

router.post("/update", TodoController.update);

router.get("/:id([0-9]{1,4})", TodoController.show);

router.put("/", TodoController.done);

router.delete("/:id([0-9]{1,4})", TodoController.destroy);


export default router;
