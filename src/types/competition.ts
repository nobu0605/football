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
  area: {
    id: number
    name: string
    code: string
    flag: string
  }
  code: string
  currentSeason: Season
  emblem: string
  id: number
  lastUpdated: string
  name: string
  seasons: Array<Season>
  type: string
}
