'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Flex } from '@/components/ui/Flex'
import { mobileWidth } from '@/constants/screen'
import { MatchesTable } from '@/features/players/components/MatchesTable'
import { PlayerTable } from '@/features/players/components/PlayerTable'
import { useWindowSize } from '@/hooks/useWindowSize'
import { Match } from '@/types/match'
import { Player } from '@/types/player'
import { fetchFromAPI } from '@/utils/fetch'

export default function PlayerPage() {
  const params = useParams()
  const { playerId } = params
  const [player, setPlayer] = useState<Player | null>(null)
  const [matches, setMatches] = useState<Array<Match>>([])
  const [windowWidth] = useWindowSize()
  const isMobile = windowWidth < mobileWidth

  useEffect(() => {
    async function getPlayersData() {
      const res = await fetchFromAPI('GET', `/api/players/${playerId}`)
      setPlayer(res)
    }

    async function getmatchesData() {
      const res = await fetchFromAPI('GET', `/api/players/${playerId}/matches`)
      setMatches(res.matches)
    }

    getPlayersData()
    getmatchesData()
  }, [])

  if (!player || matches.length === 0) return <></>
  const { name, dateOfBirth, nationality, section, position, shirtNumber, currentTeam } = player

  return (
    <Flex $content='center' $direction='column'>
      <Flex $content='center' $items='center' $gap={'15px'}>
        <h1>{player.name}</h1>
      </Flex>
      <Flex $content='center' $direction={isMobile ? 'column' : 'row'} $gap={'20px'}>
        <Flex $direction='column'>
          <h2>Profile</h2>
          <PlayerTable
            name={name}
            dateOfBirth={dateOfBirth}
            shirtNumber={shirtNumber}
            currentTeam={currentTeam}
            nationality={nationality}
            section={section}
            position={position}
          />
        </Flex>
        <Flex $direction='column'>
          <h2>Latest matches</h2>
          <MatchesTable matches={matches} />
        </Flex>
      </Flex>
    </Flex>
  )
}
