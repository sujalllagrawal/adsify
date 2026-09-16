import React from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

const base = 'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 rounded disabled:opacity-50 disabled:pointer-events-none'
const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-teal-600',
  secondary: 'bg-transparent text-ink border border-ink/20 hover:border-ink',
  ghost: 'bg-transparent text-ink-soft hover:text-ink',
}
const sizes: Record<Size, string> = {
  sm: 'text-sm px-3.5 py-2',
  md: 'text-[15px] px-5 py-2.5',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
}

interface LinkButtonProps {
  to: string
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

export function LinkButton({ to, variant = 'primary', size = 'md', className = '', children }: LinkButtonProps) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </Link>
  )
}
