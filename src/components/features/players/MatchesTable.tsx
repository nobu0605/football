'use client'
import { Table, TableBody, TableCell, TableRow, styled, TableHead } from '@mui/material'
import Image from 'next/image'
import { Flex } from '@/components/ui/Flex'
import { Match } from '@/types/match'
import { CurrentTeam } from '@/types/player'
import { utcToJstDate } from '@/utils/date'

type Props = {
  matches: Array<Match>
  currentTeam: CurrentTeam
}

export function MatchesTable({ matches, currentTeam }: Props) {
  return (
    <StyledMatchesTable>
      <StyledTableHead>
        <TableRow>
          <TableCell>Match Date</TableCell>
          <TableCell>Score</TableCell>
          <TableCell>Home</TableCell>
          <TableCell>Away</TableCell>
        </TableRow>
      </StyledTableHead>
      <TableBody>
        {matches.map((match: Match, i: number) => {
          const { homeTeam, awayTeam } = match
          return (
            <TableRow hover key={i}>
              <TableCell>{utcToJstDate(match.utcDate)}</TableCell>
              <TableCell>
                <Flex $items='center' $gap='5px'>
                  <Image
                    src={homeTeam.crest}
                    alt={currentTeam.name}
                    width={35}
                    height={35}
                    priority={false}
                  ></Image>
                  <StyledScoreSpan isWinner={match.score.fullTime.home > match.score.fullTime.away}>
                    {match.score.fullTime.home}
                  </StyledScoreSpan>
                  -
                  <StyledScoreSpan isWinner={match.score.fullTime.away > match.score.fullTime.home}>
                    {match.score.fullTime.away}
                  </StyledScoreSpan>
                  <Image
                    src={awayTeam.crest}
                    alt={currentTeam.name}
                    width={35}
                    height={35}
                    priority={false}
                  ></Image>
                </Flex>
              </TableCell>
              <TableCell>
                <Flex $direction='row' $items='center' $gap='10px'>
                  <span>{homeTeam.name}</span>
                  <Image
                    src={homeTeam.crest}
                    alt={currentTeam.name}
                    width={35}
                    height={35}
                    priority={false}
                  ></Image>
                </Flex>
              </TableCell>
              <TableCell>
                <Flex $direction='row' $items='center' $gap='10px'>
                  <span>{awayTeam.name}</span>
                  <Image
                    src={awayTeam.crest}
                    alt={currentTeam.name}
                    width={35}
                    height={35}
                    priority={false}
                  ></Image>
                </Flex>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </StyledMatchesTable>
  )
}

const StyledMatchesTable = styled(Table)`
  max-width: 800px;
`

const StyledTableHead = styled(TableHead)`
  background-color: #e6f3ff;
`

const StyledScoreSpan = styled('span')<{ isWinner: boolean }>`
  font-size: 25px;
  color: ${({ isWinner }) => (isWinner ? 'red' : 'black')};
`
