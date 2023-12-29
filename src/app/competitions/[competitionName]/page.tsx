'use client'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { Flex } from '@/components/ui/Flex'
import { Competition } from '@/types/competition'
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
        <Table sx={{ maxWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Term</TableCell>
              <TableCell>Winner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seasons.map((season, i) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  {season.startDate} ~ {season.endDate}
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Flex>
    </Flex>
  )
}
