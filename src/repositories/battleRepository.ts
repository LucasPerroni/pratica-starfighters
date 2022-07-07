import db from "../../database/db.js"

function findUser(user: string) {
  return db.query(`SELECT * FROM fighters WHERE username = $1`, [user])
}

function createUser(user: string) {
  return db.query(`INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, 0, 0, 0)`, [user])
}

function updateUser(user: string, wins: number, losses: number, draws: number) {
  return db.query(
    `UPDATE fighters 
    SET (wins, losses, draws) = ($1 + wins, $2 + losses, $3 + draws) 
    WHERE username = $4`,
    [wins, losses, draws, user]
  )
}

const battleRepository = {
  findUser,
  createUser,
  updateUser,
}

export default battleRepository
