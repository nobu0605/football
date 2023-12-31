'use client'
import { Table, TableBody, TableCell, TableRow, styled } from '@mui/material'
import Image from 'next/image'
import { Flex } from '@/components/ui/Flex'
import { CurrentTeam } from '@/types/player'

type Props = {
  name: string
  dateOfBirth: string
  shirtNumber: number | null
  currentTeam: CurrentTeam
  nationality: string
  section: string
  position: string
}

export function PlayerTable({
  name,
  dateOfBirth,
  shirtNumber,
  currentTeam,
  nationality,
  section,
  position,
}: Props) {
  return (
    <StyledPlayerTable>
      <TableBody>
        <TableRow>
          <TableCell>name</TableCell>
          <TableCell>{name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>dateOfBirth</TableCell>
          <TableCell>{dateOfBirth}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>shirtNumber</TableCell>
          <TableCell>{shirtNumber ? shirtNumber : 'no data'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Current team</TableCell>
          <TableCell>
            <Flex $direction='row' $items='center' $gap='10px'>
              <span>{currentTeam.name}</span>
              <Image
                src={currentTeam.crest}
                alt={currentTeam.name}
                width={50}
                height={50}
                priority={false}
              ></Image>
            </Flex>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>nationality</TableCell>
          <TableCell>{nationality}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>position</TableCell>
          <TableCell>
            {section} / {position}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>contract</TableCell>
          <TableCell>
            {currentTeam.contract.start && currentTeam.contract.until ? (
              <span>
                {currentTeam.contract.start} ~ {currentTeam.contract.until}
              </span>
            ) : (
              'no data'
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </StyledPlayerTable>
  )
}

const StyledPlayerTable = styled(Table)`
  max-width: 450px;
`
