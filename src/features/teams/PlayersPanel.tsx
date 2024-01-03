'use client'
import { Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FavoriteStar } from '@/features/FavoriteStar'
import { Button } from '@/components/ui/Button'
import { Player } from '@/types/team'

type Props = {
  squad: Array<Player>
}

export function PlayersPanel({ squad }: Props) {
  const router = useRouter()
  const [favoritePlayerId, setFavoritePlayerId] = useState<number | null>(null)

  useEffect(() => {
    const _favoritePlayerId = localStorage.getItem('favoritePlayer')
    setFavoritePlayerId(Number(_favoritePlayerId))
  }, [])

  return (
    <StyledTable>
      <StyledTableHead>
        <TableRow>
          <TableCell align='center'>Name</TableCell>
          <TableCell align='center'>Nationality</TableCell>
          <TableCell align='center'>Position</TableCell>
          <TableCell align='center'>Date of birth</TableCell>
          <TableCell align='center'>Add to favorites</TableCell>
          <TableCell align='center'>Detail</TableCell>
        </TableRow>
      </StyledTableHead>
      <TableBody>
        {squad.map((player: Player, i) => (
          <TableRow hover key={i}>
            <TableCell>{player.name}</TableCell>
            <TableCell>{player.nationality}</TableCell>
            <TableCell>{player.position}</TableCell>
            <TableCell>{player.dateOfBirth}</TableCell>
            <TableCell>
              <FavoriteStar
                id={player.id}
                type='player'
                favoriteId={favoritePlayerId}
                setFavoriteId={setFavoritePlayerId}
              />
            </TableCell>
            <TableCell>
              <Button variant='outlined' onClick={() => router.push(`/players/${player.id}`)}>
                detail
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </StyledTable>
  )
}

const StyledTable = styled(Table)`
  max-width: 650px;
`

const StyledTableHead = styled(TableHead)`
  background-color: #dcdcdc;
`
