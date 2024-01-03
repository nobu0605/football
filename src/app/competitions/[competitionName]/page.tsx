'use client'
import { styled } from '@mui/material'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Flex } from '@/components/ui/Flex'
import { Tabs, Tab } from '@/components/ui/Tabs'
import { CompetitionSeasonsTable } from '@/features/competitions/components/CompetitionSeasonsTable'
import { CupResults } from '@/features/competitions/components/CupResults'
import { LeagueRankingTable } from '@/features/competitions/components/LeagueRankingTable'
import { Competition, competitionType, CompetitionResult } from '@/types/competition'
import { fetchFromAPI } from '@/utils/fetch'

type CompetitionResultLabels = {
  LEAGUE: string
  CUP: string
  [key: string]: string
}

export default function Competition() {
  const params = useParams()
  const { competitionName } = params
  const [competition, setCompetition] = useState<Competition | null>(null)
  const [competitionResult, setCompetitionResult] = useState<CompetitionResult | null>(null)

  useEffect(() => {
    async function getCompetition() {
      const resCompetition = await fetchFromAPI('GET', `/api/competitions/${competitionName}`)

      setCompetition(resCompetition)
      const resCompetitionResult = await fetchFromAPI(
        'GET',
        `/api/competitions/${competitionName}/standings`,
      )
      setCompetitionResult(resCompetitionResult)
    }
    getCompetition()
  }, [])

  if (!competition || !competitionResult) return <></>

  const competitionResultLabels: CompetitionResultLabels = {
    LEAGUE: 'Ranking',
    CUP: 'Results',
  }

  const { seasons, type, currentSeason } = competition

  const tabs: Array<Tab> = [
    {
      name: competitionResultLabels[type],
      panel:
        type === competitionType.LEAGUE ? (
          <LeagueRankingTable
            ranks={competitionResult.standings[0].table}
            currentSeason={currentSeason}
          />
        ) : (
          <CupResults standings={competitionResult.standings} currentSeason={currentSeason} />
        ),
    },
    {
      name: 'Seasons',
      panel: <CompetitionSeasonsTable seasons={seasons} />,
    },
  ]

  return (
    <Flex $content='center' $direction='column' $gap={'15px'}>
      <Flex $content='center' $items='center' $gap={'15px'}>
        <h1>{competition.name}</h1>
        <Image
          src={competition.emblem}
          alt={competition.name}
          width={100}
          height={100}
          priority={false}
        ></Image>
      </Flex>
      <Flex $content='center'>
        <StyledTabWrapper>
          <Tabs tabs={tabs} />
        </StyledTabWrapper>
      </Flex>
    </Flex>
  )
}

const StyledTabWrapper = styled('div')`
  min-width: 650px;
`
