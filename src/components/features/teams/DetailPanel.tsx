'use client'
import { Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  address: string
  clubColors: string
  founded: number
  venue: string
  website: string
  areaFlag?: string
}

export function DetailPanel({ address, clubColors, founded, venue, website, areaFlag }: Props) {
  return (
    <StyledTable>
      <StyledTableHead>
        <TableRow>
          <TableCell>Club colors</TableCell>
          <TableCell>Founded year</TableCell>
          <TableCell>Venue</TableCell>
          <TableCell>Website</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Area</TableCell>
        </TableRow>
      </StyledTableHead>
      <TableBody>
        <TableRow>
          <TableCell>{clubColors}</TableCell>
          <TableCell>{founded}</TableCell>
          <TableCell>{venue}</TableCell>
          <TableCell>
            <a href={website} target='_blank' rel='noopener noreferrer'>
              {website}
            </a>
          </TableCell>
          <TableCell>{address}</TableCell>
          <TableCell>
            {areaFlag && (
              <Image src={areaFlag} alt={'flag'} width={100} height={100} priority={false}></Image>
            )}
          </TableCell>
        </TableRow>
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`
