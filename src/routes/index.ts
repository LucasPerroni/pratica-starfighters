import { Router } from "express"

import battleRouter from "./battleRouter.js"
import rankingRouter from "./rankingRouter.js"

const routes = Router()

routes.use(battleRouter)
routes.use(rankingRouter)

export default routes
