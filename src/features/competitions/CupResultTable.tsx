'use client'
import { Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material'
import { TeamName } from '@/features/TeamName'
import { TeamResult } from '@/types/team'

type Props = {
  results: Array<TeamResult>
}

export function CupResultTable({ results }: Props) {
  return (
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
        {results.map((result: TeamResult, i) => (
          <TableRow key={i}>
            <TableCell>{result.position}</TableCell>
            <TableCell>
              <TeamName
                href={`/teams/${result.team.id}`}
                teamName={result.team.name}
                teamImageUrl={result.team.crest}
              />
            </TableCell>
            <TableCell>{result.won}</TableCell>
            <TableCell>{result.lost}</TableCell>
            <TableCell>{result.draw}</TableCell>
            <TableCell>{result.points}</TableCell>
            <TableCell>{result.playedGames}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </StyledTable>
  )
}

const StyledTable = styled(Table)`
  max-width: 1000px;
`

const StyledTableHead = styled(TableHead)`
  background-color: #dcdcdc;
`
