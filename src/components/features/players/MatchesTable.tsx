'use client'
import { Table, TableBody, TableCell, TableRow, styled, TableHead } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { Flex } from '@/components/ui/Flex'
import { Match } from '@/types/match'
import { utcToJstDate } from '@/utils/date'

type Props = {
  matches: Array<Match>
}

export function MatchesTable({ matches }: Props) {
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
                  <Link href={`/teams/${homeTeam.id}`}>
                    <Image
                      src={homeTeam.crest}
                      alt={'homeTeam'}
                      width={35}
                      height={35}
                      priority={false}
                    ></Image>
                  </Link>
                  <StyledScoreSpan isWinner={match.score.fullTime.home > match.score.fullTime.away}>
                    {match.score.fullTime.home}
                  </StyledScoreSpan>
                  -
                  <StyledScoreSpan isWinner={match.score.fullTime.away > match.score.fullTime.home}>
                    {match.score.fullTime.away}
                  </StyledScoreSpan>
                  <Link href={`/teams/${awayTeam.id}`}>
                    <Image
                      src={awayTeam.crest}
                      alt={'awayTeam'}
                      width={35}
                      height={35}
                      priority={false}
                    ></Image>
                  </Link>
                </Flex>
              </TableCell>
              <TableCell>
                <Link href={`/teams/${homeTeam.id}`}>
                  <Flex $direction='row' $items='center' $gap='10px'>
                    <span>{homeTeam.name}</span>
                    <Image
                      src={homeTeam.crest}
                      alt={'homeTeam'}
                      width={35}
                      height={35}
                      priority={false}
                    ></Image>
                  </Flex>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/teams/${awayTeam.id}`}>
                  <Flex $direction='row' $items='center' $gap='10px'>
                    <span>{awayTeam.name}</span>
                    <Image
                      src={awayTeam.crest}
                      alt={'awayTeam'}
                      width={35}
                      height={35}
                      priority={false}
                    ></Image>
                  </Flex>
                </Link>
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
  background-color: #dcdcdc;
`

const StyledScoreSpan = styled('span')<{ isWinner: boolean }>`
  font-size: 25px;
  color: ${({ isWinner }) => (isWinner ? 'red' : 'black')};
`
