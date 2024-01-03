'use client'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { styled } from '@mui/material'
import { Flex } from '@/components/ui/Flex'
import { favoriteLocalStorageKeys } from '@/constants/localStorage'

type Props = {
  id: number
  type: 'player' | 'team'
  favoriteId: number | null
  setFavoriteId: (id: number | null) => void
}

export function FavoriteStar({ id, type, favoriteId, setFavoriteId }: Props) {
  function addFavoriter(targetId: number) {
    localStorage.setItem(favoriteLocalStorageKeys[type], String(targetId))
    setFavoriteId(id)
  }

  function removeFavorite() {
    localStorage.removeItem(favoriteLocalStorageKeys[type])
    setFavoriteId(null)
  }

  return (
    <Flex $content='center'>
      {id === favoriteId ? (
        <StyledStarIcon htmlColor='red' onClick={removeFavorite} />
      ) : (
        <StyledStarBorderIcon onClick={() => addFavoriter(id)} />
      )}
    </Flex>
  )
}

const StyledStarBorderIcon = styled(StarBorderIcon)`
  cursor: pointer;
`

const StyledStarIcon = styled(StarIcon)`
  cursor: pointer;
`
