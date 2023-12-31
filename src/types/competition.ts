import { Area } from '@/types/area'
import { TeamResult } from '@/types/team'

export type Winner = {
  address: string
  clubColors: string
  crest: string
  founded: number
  id: number
  lastUpdated: string
  name: string
  shortName: string
  tla: string
  venue: string
  website: string
}

export type Season = {
  currentMatchday: number
  endDate: string
  id: number
  startDate: string
  winner: Winner | null
}

export type Competition = {
  area: Area
  code: string
  currentSeason: Season
  emblem: string
  id: number
  lastUpdated: string
  name: string
  seasons: Array<Season>
  type: string
}

export type RunningCompetition = {
  code: string
  emblem: string
  id: number
  name: string
  type: string
}

export type Standing = {
  group: null
  stage: string
  table: Array<TeamResult>
  type: string
}

export type CompetitionResult = {
  area: Area
  competition: { id: number; name: string; code: string; type: string; emblem: string }
  filters: { season: string }
  season: Season
  standings: Array<Standing>
}

export const competitionType = {
  LEAGUE: 'LEAGUE',
  CUP: 'CUP',
} as const

export type CompetitionType = (typeof competitionType)[keyof typeof competitionType]
