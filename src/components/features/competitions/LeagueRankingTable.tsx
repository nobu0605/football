'use client'
import { Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material'
import { TeamName } from '@/components/features/TeamName'
import { Flex } from '@/components/ui/Flex'
import { Season } from '@/types/competition'
import { TeamResult } from '@/types/team'

type Props = {
  ranks: Array<TeamResult>
  currentSeason: Season
}

export function LeagueRankingTable({ ranks, currentSeason }: Props) {
  return (
    <Flex $direction='column' $gap={'10px'}>
      <StyledCurrentSeasonSpan>
        Term: {currentSeason.startDate} ~ {currentSeason.endDate}
      </StyledCurrentSeasonSpan>
      <StyledTable>
        <StyledTableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Won</TableCell>
            <TableCell>Lost</TableCell>
            <TableCell>Draw</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Played Games</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {ranks.map((rank: TeamResult, i) => (
            <TableRow key={i}>
              <TableCell>{rank.position}</TableCell>
              <TableCell>
                <TeamName
                  href={`/teams/${rank.team.id}`}
                  teamName={rank.team.name}
                  teamImageUrl={rank.team.crest}
                />
              </TableCell>
              <TableCell>{rank.won}</TableCell>
              <TableCell>{rank.lost}</TableCell>
              <TableCell>{rank.draw}</TableCell>
              <TableCell>{rank.points}</TableCell>
              <TableCell>{rank.playedGames}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Flex>
  )
}

const StyledTable = styled(Table)`
  max-width: 1000px;
`

const StyledTableHead = styled(TableHead)`
  background-color: #dcdcdc;
`

const StyledCurrentSeasonSpan = styled('span')`
  font-size: 20px;
  margin-top: 20px;
`
