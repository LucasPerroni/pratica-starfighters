import { Request, Response } from "express"

import errorHandler from "../middlewares/errorHandler.js"
import { battleResult, updateParticipants } from "../services/battleServices.js"

export async function postBattle(req: Request, res: Response) {
  const { firstUser, secondUser }: { firstUser: string; secondUser: string } = req.body

  try {
    const log = await battleResult(firstUser, secondUser)
    await updateParticipants(firstUser, secondUser, log)

    res.send(log)
  } catch (e) {
    if (e.response) {
      return res.sendStatus(e.response.status)
    }

    errorHandler(e, req, res, null)
  }
}
