import { Area } from '@/types/area'
import { Season } from '@/types/competition'

type Competition = {
  code: string
  emblem: string
  id: number
  name: string
  type: string
}

type Team = {
  crest: string
  id: number
  name: string
  shortName: string
  tla: string
}

type Referee = {
  id: number
  name: string
  nationality: string
  type: string
}

type ScoreNumber = {
  away: number
  home: number
}

export type Match = {
  area: Area
  awayTeam: Team
  competition: Competition
  group: null
  homeTeam: Team
  id: number
  lastUpdated: string
  matchday: number
  odds: { msg: string }
  referees: Array<Referee>
  score: {
    winner: string
    duration: string
    fullTime: ScoreNumber
    halfTime: ScoreNumber
  }
  season: Season
  stage: string
  status: string
  utcDate: string
}
