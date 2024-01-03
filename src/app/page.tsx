'use client'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { CompetitionCards } from '@/features/competitions/components/CompetitionCards'
import { MatchesTable } from '@/features/players/components/MatchesTable'
import { Flex } from '@/components/ui/Flex'
import { Tooltip } from '@/components/ui/Tooltip'
import { Competition } from '@/types/competition'
import { Matches } from '@/types/match'
import { Player } from '@/types/player'
import { Team } from '@/types/team'
import { fetchFromAPI } from '@/utils/fetch'

export default function Home() {
  const [competitions, setCompetitions] = useState<Array<Competition> | null>(null)
  const [favoritePlayerId, setFavoritePlayerId] = useState<number | null>(null)
  const [favoriteTeamId, setFavoriteTeamId] = useState<number | null>(null)
  const [favoritePlayerMatches, setFavoritePlayerMatches] = useState<Matches | null>(null)
  const [favoritePlayer, setFavoritePlayer] = useState<Player | null>(null)
  const [favoriteTeam, setFavoriteTeam] = useState<Team | null>(null)
  const [favoriteTeamMatches, setFavoriteTeamMatches] = useState<Matches | null>(null)

  useEffect(() => {
    const _favoritePlayerId = localStorage.getItem('favoritePlayer')
    setFavoritePlayerId(Number(_favoritePlayerId))
    const _favoriteTeamId = localStorage.getItem('favoriteTeam')
    setFavoriteTeamId(Number(_favoriteTeamId))

    async function getCompetitions() {
      const res = await fetchFromAPI('GET', '/api/competitions')
      setCompetitions(res.competitions)
    }

    async function getFavoritePlayer() {
      const resFavoritePlayer = await fetchFromAPI('GET', `/api/players/${_favoritePlayerId}`)
      setFavoritePlayer(resFavoritePlayer)
      const resFavoritePlayerMatches = await fetchFromAPI(
        'GET',
        `/api/players/${_favoritePlayerId}/matches`,
      )
      setFavoritePlayerMatches(resFavoritePlayerMatches)
    }

    async function getTeam() {
      const resFavoriteTeam = await fetchFromAPI('GET', `/api/teams/${_favoriteTeamId}`)
      setFavoriteTeam(resFavoriteTeam)
      const resFavoriteTeamMatches = await fetchFromAPI(
        'GET',
        `/api/teams/${_favoriteTeamId}/matches`,
      )
      setFavoriteTeamMatches(resFavoriteTeamMatches)
    }

    if (!_favoritePlayerId && !_favoriteTeamId) {
      getCompetitions()
      return
    }

    if (_favoritePlayerId) {
      getFavoritePlayer()
    }
    if (_favoriteTeamId) {
      getTeam()
    }
  }, [])

  if (favoritePlayerId || favoriteTeamId) {
    return (
      <StyledFavoriteFlex $direction='row' $gap={'35px'}>
        {favoritePlayer && favoritePlayerMatches && (
          <Flex $direction='column' $gap={'15px'}>
            <Flex $gap={'40px'}>
              <StyledFavoritePlayerNameSpan>{favoritePlayer?.name}</StyledFavoritePlayerNameSpan>
              <StyledTeamResultFlex $direction='column'>
                <span>
                  term: {favoritePlayerMatches.resultSet.first} ~{' '}
                  {favoritePlayerMatches.resultSet.last}
                </span>
                <span>count: {favoritePlayerMatches.resultSet.count}</span>
              </StyledTeamResultFlex>
            </Flex>
            <StyledMatchesSpan>Latest matches</StyledMatchesSpan>
            <MatchesTable matches={favoritePlayerMatches.matches} />
          </Flex>
        )}
        {favoriteTeamMatches && favoriteTeam && (
          <Flex $direction='column' $gap={'15px'}>
            <Flex $direction='row' $gap={'40px'}>
              <Flex $direction='row' $items='center' $gap={'5px'}>
                <StyledFavoritePlayerNameSpan>{favoriteTeam.name}</StyledFavoritePlayerNameSpan>
                <Image
                  src={favoriteTeam.crest}
                  alt={favoriteTeam.name}
                  width={30}
                  height={30}
                  priority={false}
                ></Image>
              </Flex>
              <StyledTeamResultFlex $direction='column'>
                <StyledMatchesSpan>Result</StyledMatchesSpan>
                <span>
                  term: {favoriteTeamMatches.resultSet.first} ~ {favoriteTeamMatches.resultSet.last}
                </span>
                <span>
                  wins: {favoriteTeamMatches.resultSet.wins}&nbsp; losses:{' '}
                  {favoriteTeamMatches.resultSet.losses}&nbsp; draws:{' '}
                  {favoriteTeamMatches.resultSet.draws}
                </span>
              </StyledTeamResultFlex>
            </Flex>
            <StyledMatchesSpan>Latest matches</StyledMatchesSpan>
            <MatchesTable matches={favoriteTeamMatches.matches} />
          </Flex>
        )}
      </StyledFavoriteFlex>
    )
  }

  if (!competitions) return <></>

  return (
    <Flex $direction='column' $gap='5px'>
      <Flex $direction='row' $items='center'>
        <StyledTitleSpan>{"Let's find your favorite team or player!"}</StyledTitleSpan>
        <Tooltip
          arrow
          placement='top'
          title='After you add a player or team to your favorites, you can watch it on this page.'
        >
          <HelpOutlineIcon />
        </Tooltip>
      </Flex>
      <CompetitionCards competitions={competitions} />
    </Flex>
  )
}

const StyledTitleSpan = styled('span')`
  font-size: 20px;
`

const StyledFavoritePlayerNameSpan = styled('span')`
  font-size: 30px;
`

const StyledFavoriteFlex = styled(Flex)`
  margin: 30px;
`

const StyledMatchesSpan = styled('span')`
  font-size: 20px;
`

const StyledTeamResultFlex = styled(Flex)`
  font-size: 15px;
`
