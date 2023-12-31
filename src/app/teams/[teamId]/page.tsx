'use client'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { DetailPanel } from '@/components/features/teams/DetailPanel'
import { PlayersPanel } from '@/components/features/teams/PlayersPanel'
import { Flex } from '@/components/ui/Flex'
import { Tabs, Tab } from '@/components/ui/Tabs'
import { Competition } from '@/types/competition'
import { Team } from '@/types/team'
import { fetchFromAPI } from '@/utils/fetch'

export default function Competition() {
  const params = useParams()
  const { teamId } = params
  const [team, setTeam] = useState<Team | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getCompetitionData() {
      const res = await fetchFromAPI('GET', `/api/teams/${teamId}`)

      // TODO: I want to improve this error handling
      if (res?.error?.code === 403) {
        setError(res?.error?.message)
      }

      setTeam(res)
    }

    getCompetitionData()
  }, [])

  if (error) {
    return <>no data</>
  }

  if (!team) return <></>
  const { squad, address, clubColors, founded, venue, website, area } = team

  const tabs: Array<Tab> = [
    {
      name: 'Detail',
      panel: (
        <DetailPanel
          address={address}
          clubColors={clubColors}
          founded={founded}
          venue={venue}
          website={website}
          areaFlag={area?.flag}
        />
      ),
    },
    {
      name: 'Players',
      panel: <PlayersPanel squad={squad} />,
    },
  ]

  return (
    <Flex $content='center' $direction='column'>
      <Flex $content='center' $items='center' $gap={'15px'}>
        <h1>{team.name}</h1>
        <Image src={team.crest} alt={team.name} width={100} height={100} priority={false}></Image>
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
