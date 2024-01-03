'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Flex } from '@/components/ui/Flex'

type Props = {
  href: string
  teamName: string
  teamImageUrl: string
  width?: number
  height?: number
}

export function TeamName({ href, teamName, teamImageUrl, width = 35, height = 35 }: Props) {
  return (
    <Link href={href}>
      <Flex $direction='row' $items='center' $gap='10px'>
        <span>{teamName}</span>
        <Image
          src={teamImageUrl}
          alt={teamName}
          width={width}
          height={height}
          priority={false}
        ></Image>
      </Flex>
    </Link>
  )
}
