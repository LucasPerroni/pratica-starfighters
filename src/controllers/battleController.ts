import { Request, Response } from "express"

import db from "../../database/db.js"
import errorHandler from "../middlewares/errorHandler.js"

export async function postBattle(req: Request, res: Response) {
  try {
    res.sendStatus(200)
  } catch (e) {
    errorHandler(e, req, res, null)
  }
}
