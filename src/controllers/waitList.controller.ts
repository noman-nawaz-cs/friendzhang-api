import { Request, Response } from "express";
import { WaitListService } from "../services/waitList.service";
import { WaitListData } from "../utils/interfaces/waitList.interface";

/*
 * WaitList controller class to handle signup
 */
export class WaitListController {
  private waitListService: WaitListService;

  constructor() {
    this.waitListService = new WaitListService();
  }

  public async handleSignUp(
    req: Request<{}, {}, WaitListData>,
    res: Response
  ): Promise<Response> {
    const waitListData = req.body;

    try {
      const response = await this.waitListService.processSignUp(waitListData);
      return res.status(response.statusCode).json(response.body);
    } catch (error) {
      console.error("Error processing waitList signup", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
