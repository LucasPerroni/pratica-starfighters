import axios from "axios"

import battleRepository from "../repositories/battleRepository.js"

export async function battleResult(firstUser: string, secondUser: string) {
  // first user counter
  let counter1 = 0
  const { data: repositorios1 }: { data: [] } = await axios.get(
    `https://api.github.com/users/${firstUser}/repos`
  )
  repositorios1.forEach(({ stargazers_count }) => (counter1 += stargazers_count))

  // second user counter
  let contador2 = 0
  const { data: repositorios2 }: { data: [] } = await axios.get(
    `https://api.github.com/users/${secondUser}/repos`
  )
  repositorios2.forEach(({ stargazers_count }) => (contador2 += stargazers_count))

  // battle log
  const draw: boolean = counter1 === contador2 ? true : false
  const winner: string = draw ? null : counter1 > contador2 ? firstUser : secondUser
  const loser: string = draw ? null : counter1 > contador2 ? secondUser : firstUser

  const log = {
    winner,
    loser,
    draw,
  }

  return log
}

export async function updateParticipants(
  firstUser: string,
  secondUser: string,
  log: { winner: string; loser: string; draw: boolean }
) {
  // check if users are in the database
  const { rows: firstParticipant } = await battleRepository.findUser(firstUser)
  const { rows: secondParticipant } = await battleRepository.findUser(secondUser)

  // create new rows in the database the a user doesn't exist
  if (!firstParticipant[0]) {
    await battleRepository.createUser(firstUser)
  }
  if (!secondParticipant[0]) {
    await battleRepository.createUser(secondUser)
  }

  // log for first and second users
  const win1 = log.draw ? 0 : log.winner === firstUser ? 1 : 0
  const lose1 = log.draw ? 0 : log.winner === firstUser ? 0 : 1
  const win2 = log.draw ? 0 : log.winner === secondUser ? 1 : 0
  const lose2 = log.draw ? 0 : log.winner === secondUser ? 0 : 1

  // update user data
  await battleRepository.updateUser(firstUser, win1, lose1, log.draw ? 1 : 0)
  await battleRepository.updateUser(secondUser, win2, lose2, log.draw ? 1 : 0)
}
