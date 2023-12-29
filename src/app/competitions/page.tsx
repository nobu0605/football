'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Card } from '@/components/ui/Card'
import { Flex } from '@/components/ui/Flex'
import { Competition } from '@/types/competition'
import { fetchFromAPI } from '@/utils/fetch'

export default function Competitions() {
  const [competitions, setCompetitions] = useState<Array<Competition> | null>(null)

  useEffect(() => {
    async function getCompetitionsData() {
      const res = await fetchFromAPI('GET', '/api/competitions')
      setCompetitions(res.competitions)
    }
    getCompetitionsData()
  }, [])

  if (!competitions) return <></>

  return (
    <div>
      <h1>Competitions</h1>
      <Flex $wrap='wrap' $gap='15px'>
        {competitions.map((competition: Competition, i: number) => {
          return (
            <StyledLink key={i} href={`/competitions/${competition.code}`}>
              <Card width='150px' height='200px'>
                <Flex $direction='column' $gap='12px'>
                  <Flex $content='center'>
                    <Image
                      src={competition.emblem}
                      alt={competition.name}
                      width={100}
                      height={100}
                      priority={false}
                    ></Image>
                  </Flex>
                  <StyledCompetitionNameFlex $direction='column' $gap='4px'>
                    <span>{competition.name}</span>
                    <span>{competition.area.name}</span>
                  </StyledCompetitionNameFlex>
                </Flex>
              </Card>
            </StyledLink>
          )
        })}
      </Flex>
    </div>
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

const StyledCompetitionNameFlex = styled(Flex)`
  text-align: center;
`
