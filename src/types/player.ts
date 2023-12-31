import { Area } from '@/types/area'
import { RunningCompetition } from '@/types/competition'

export type CurrentTeam = {
  address: string
  area: Area
  clubColors: string
  contract: { start: string | null; until: string | null }
  crest: string
  founded: number
  id: number
  name: string
  runningCompetitions: Array<RunningCompetition>
  shortName: string
  tla: string
  venue: string
  website: string
}

export type Player = {
  currentTeam: CurrentTeam
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  lastUpdated: string
  name: string
  nationality: string
  position: string
  section: string
  shirtNumber: number | null
}
