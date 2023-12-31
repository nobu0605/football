import { Area } from '@/types/area'
import { RunningCompetition } from '@/types/competition'

export type Coach = {
  id: number
  firstName: string
  lastName: string
  name: string
  dateOfBirth: string
  nationality: string
}

export type Player = {
  id: number
  name: string
  dateOfBirth: string
  nationality: string
  position: string
}

export type Team = {
  address: string
  area: Area
  clubColors: string
  coach: Coach
  crest: string
  founded: number
  id: number
  lastUpdated: string
  name: string
  runningCompetitions: Array<RunningCompetition>
  shortName: string
  squad: Array<Player>
  staff: Array<any>
  tla: string
  venue: string
  website: string
}

export type TeamResult = {
  draw: number
  form: null
  goalDifference: number
  goalsAgainst: number
  goalsFor: number
  lost: number
  playedGames: number
  points: number
  position: number
  team: {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
  }
  won: number
}
