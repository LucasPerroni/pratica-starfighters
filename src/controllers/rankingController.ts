import { Request, Response } from "express"

import db from "../../database/db.js"

export async function getRanking(req: Request, res: Response) {
  try {
    res.sendStatus(200)
  } catch (e) {
    res.sendStatus(500)
  }
}
