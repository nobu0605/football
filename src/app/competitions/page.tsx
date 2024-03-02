'use client'
import { useEffect, useState } from 'react'
import { CompetitionCards } from '@/features/competitions/components/CompetitionCards'
import { Competition } from '@/types/competition'
import { fetchFromAPI } from '@/utils/fetch'

export default function Competitions() {
  const [competitions, setCompetitions] = useState<Array<Competition> | null>(null)

  useEffect(() => {
    async function getCompetitionsData() {
      const res = await fetchFromAPI('GET', '/api/competitions')
      setCompetitions(res.competitions)
    }
    getCompetitionsData()
  }, [])

  if (!competitions) return <></>

  return (
    <div>
      <h1>Competitions</h1>
      <CompetitionCards competitions={competitions} />
    </div>
  )
}
