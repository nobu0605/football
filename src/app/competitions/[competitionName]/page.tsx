'use client'
import { Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Flex } from '@/components/ui/Flex'
import { Competition, Season } from '@/types/competition'
import { fetchFromAPI } from '@/utils/fetch'

export default function Competition() {
  const params = useParams()
  const { competitionName } = params
  const [competition, setCompetition] = useState<Competition | null>(null)

  useEffect(() => {
    async function getCompetitionData() {
      const res = await fetchFromAPI('GET', `/api/competitions/${competitionName}`)
      setCompetition(res)
    }
    getCompetitionData()
  }, [])

  if (!competition) return <></>
  const { seasons } = competition

  return (
    <Flex $content='center' $direction='column'>
      <Flex $content='center' $items='center' $gap={'15px'}>
        <h1>{competition.name}</h1>
        <Image
          src={competition.emblem}
          alt={competition.name}
          width={100}
          height={100}
          priority={false}
        ></Image>
      </Flex>
      <Flex $content='center'>
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
                  <StyledLink href={`/teams/${season?.winner?.id}`}>
                    <Flex $content='center' $direction='column'>
                      {season?.winner && (
                        <Flex $content='center' $direction='column' $gap='7px'>
                          <span>{season?.winner?.name}</span>
                          <Image
                            src={season?.winner?.crest}
                            alt={season?.winner?.name}
                            width={100}
                            height={100}
                            priority={false}
                          ></Image>
                        </Flex>
                      )}
                      {season?.winner === null && <span>No data</span>}
                    </Flex>
                  </StyledLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Flex>
    </Flex>
  )
}

const StyledTable = styled(Table)`
  max-width: 1000px;
`

const StyledTableHead = styled(TableHead)`
  background-color: #dcdcdc;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`
