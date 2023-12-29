export type Competition = {
  area: {
    id: number
    name: string
    code: string
    flag: string
  }
  code: string
  currentSeason: {
    currentMatchday: number
    endDate: string
    id: number
    startDate: string
    winner: string | null
  }
  emblem: string
  id: number
  lastUpdated: string
  name: string
  seasons: Array<any> // TODO: Add season type
  type: string
}
