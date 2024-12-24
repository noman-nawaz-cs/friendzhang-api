import express, { Request, Response } from "express";
import { waitListController } from "../controllers/waitList.controller";

const router = express.Router();

router.post("/signup", (req: Request, res: Response) => {
  waitListController(req, res);
});

export default router;
