'use client'
import { Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { Flex } from '@/components/ui/Flex'
import { Season } from '@/types/competition'

type Props = {
  seasons: Array<Season>
}

export function CompetitionSeasonsTable({ seasons }: Props) {
  return (
    <StyledTable>
      <StyledTableHead>
        <TableRow>
          <TableCell>Term</TableCell>
          <TableCell>Winner</TableCell>
        </TableRow>
      </StyledTableHead>
      <TableBody>
        {seasons.map((season: Season, i) => (
          <TableRow key={i}>
            <TableCell>
              {season.startDate} ~ {season.endDate}
            </TableCell>
            <TableCell>
              <Link href={`/teams/${season.winner?.id}`}>
                <Flex $content='center' $direction='column'>
                  {season?.winner && (
                    <Flex $content='center' $direction='column' $gap='7px'>
                      <span>{season.winner?.name}</span>
                      <Image
                        src={season.winner?.crest}
                        alt={season.winner?.name}
                        width={100}
                        height={100}
                        priority={false}
                      ></Image>
                    </Flex>
                  )}
                  {season?.winner === null && <span>No data</span>}
                </Flex>
              </Link>
            </TableCell>
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
