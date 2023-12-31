'use client'
import { Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Player } from '@/types/team'

type Props = {
  squad: Array<Player>
}

export function PlayersPanel({ squad }: Props) {
  const router = useRouter()

  return (
    <StyledTable>
      <StyledTableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Nationality</TableCell>
          <TableCell>Position</TableCell>
          <TableCell>Date of birth</TableCell>
        </TableRow>
      </StyledTableHead>
      <TableBody>
        {squad.map((player: Player, i) => (
          <StyledTablePlayerRow hover key={i} onClick={() => router.push(`/players/${player.id}`)}>
            <TableCell>{player.name}</TableCell>
            <TableCell>{player.nationality}</TableCell>
            <TableCell>{player.position}</TableCell>
            <TableCell>{player.dateOfBirth}</TableCell>
          </StyledTablePlayerRow>
        ))}
      </TableBody>
    </StyledTable>
  )
}

const StyledTable = styled(Table)`
  max-width: 650px;
`

const StyledTableHead = styled(TableHead)`
  background-color: #e6f3ff;
`

const StyledTablePlayerRow = styled(TableRow)`
  cursor: pointer;
`
