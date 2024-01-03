'use client'
import Image from 'next/image'
import Link from 'next/link'
import { styled } from 'styled-components'
import { Card } from '@/components/ui/Card'
import { Flex } from '@/components/ui/Flex'
import { Competition } from '@/types/competition'

type Props = {
  competitions: Array<Competition>
}

export function CompetitionCards({ competitions }: Props) {
  return (
    <Flex $wrap='wrap' $gap='15px'>
      {competitions.map((competition: Competition, i: number) => {
        return (
          <Link key={i} href={`/competitions/${competition.code}`}>
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
          </Link>
        )
      })}
    </Flex>
  )
}

const StyledCompetitionNameFlex = styled(Flex)`
  text-align: center;
`
