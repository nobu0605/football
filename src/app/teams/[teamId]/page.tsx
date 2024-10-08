'use client'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { Tabs, Tab } from '@/components/ui/Tabs'
import { mobileWidth } from '@/constants/screen'
import { FavoriteStar } from '@/features/components/FavoriteStar'
import { DetailPanel } from '@/features/teams/components/DetailPanel'
import { PlayersPanel } from '@/features/teams/components/PlayersPanel'
import { Team } from '@/types/team'
import { fetchFromAPI } from '@/utils/fetch'

export default function TeamPage() {
  const params = useParams()
  const { teamId } = params
  const [team, setTeam] = useState<Team | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [favoriteTeamId, setFavoriteTeamId] = useState<number | null>(null)

  useEffect(() => {
    async function getTeam() {
      const res = await fetchFromAPI('GET', `/api/teams/${teamId}`)

      // TODO: I want to improve this error handling
      if (res?.error?.code === 403) {
        setError(res?.error?.message)
      }

      setTeam(res)
      const _favoriteTeamId = localStorage.getItem('favoriteTeam')
      setFavoriteTeamId(Number(_favoriteTeamId))
    }

    getTeam()
  }, [])

  if (error) {
    return <>no data</>
  }

  if (!team) return <></>
  const { squad, address, clubColors, founded, venue, website, area } = team

  const tabs: Array<Tab> = [
    {
      name: 'Players',
      panel: <PlayersPanel squad={squad} />,
    },
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
  ]

  return (
    <Flex $content='center' $direction='column'>
      <Flex $content='center' $items='center' $gap={'15px'}>
        <h1>{team.name}</h1>
        <Image src={team.crest} alt={team.name} width={100} height={100} priority={false}></Image>
        <FavoriteStar
          id={team.id}
          type='team'
          favoriteId={favoriteTeamId}
          setFavoriteId={setFavoriteTeamId}
        />
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

  @media (max-width: ${mobileWidth}px) {
    min-width: 100%;
  }
`
