import express, { Request, Response } from "express";
import { WaitListController } from "../controllers/waitList.controller";

const router = express.Router();

router.post("/signup", (req: Request, res: Response) => {
  const waitListController = new WaitListController();
  waitListController.handleSignUp(req, res);
});

export default router;
