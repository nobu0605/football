import { Button as MuiButton } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode | string
  variant?: 'text' | 'outlined' | 'contained'
  startIcon?: ReactNode
  endIcon?: ReactNode
  size?: 'small' | 'medium' | 'large'
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  disabled?: boolean
  onClick?: () => void
}

export function Button({
  children,
  variant,
  startIcon,
  endIcon,
  size,
  color,
  disabled,
  onClick,
}: Props) {
  return (
    <MuiButton
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      size={size}
      color={color}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  )
}
