import { styled } from 'styled-components'
import { Flex } from '@/components/ui/Flex'
import { CupResultTable } from '@/features/competitions/components/CupResultTable'
import { Standing, Season } from '@/types/competition'

type Props = {
  standings: Array<Standing>
  currentSeason: Season
}

export function CupResults({ standings, currentSeason }: Props) {
  return (
    <Flex $direction='column' $gap={'10px'}>
      <StyledCurrentSeasonSpan>
        Term: {currentSeason.startDate} ~ {currentSeason.endDate}
      </StyledCurrentSeasonSpan>
      <>
        {standings.map((standing: Standing, i: number) => {
          return <CupResultTable key={i} results={standing.table} />
        })}
      </>
    </Flex>
  )
}

const StyledCurrentSeasonSpan = styled('span')`
  font-size: 20px;
  margin-top: 20px;
`
