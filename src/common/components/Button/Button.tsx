import { Button as _Button } from '@headlessui/react'
import clsx from 'clsx'
import { CSSProperties } from 'react';

type TColor = 'default' | 'primary' | 'success' | 'warning' | 'error';
export type TBtnProps = {
  color: TColor;
  children?: string | React.ReactNode | React.ReactNode[];
  onClick?: () => void;
  isDisabled?: boolean;
  startIcon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'sm';
  style?: CSSProperties;
  className?: string;
}

export const Button = ({ style, className, fullWidth, size, children, color, onClick, isDisabled, startIcon }: TBtnProps) => {
  return (
    <_Button
      style={style || {}}
      className={clsx(
        'rounded',
        // 'py-2',
        // 'px-4',
        'font-bold',
        'cursor-pointer',

        'flex',
        'items-center',
        'justify-center',
        'data-[disabled]:opacity-30',
        'data-[disabled]:cursor-not-allowed',
        {
          'py-1 px-2': size === 'sm',
          'py-2 px-4': size !== 'sm',
          'w-full': fullWidth,
          [clsx(
            'bg-rose-600',
            'data-[hover]:bg-rose-500',
            'data-[active]:bg-rose-400',
            'text-black',
            'bg-gradient-to-r from-amber-400',
          )]: color === 'error',
          [clsx(
            'bg-blue-600',
            'data-[hover]:bg-blue-500',
            'data-[active]:bg-blue-400',
            'text-white',
            'bg-gradient-to-r from-emerald-400',
          )]: color === 'primary',
          [clsx(
            'bg-slate-600',
            'data-[hover]:bg-slate-500',
            'data-[active]:bg-slate-400',
            'text-white',
            'bg-gradient-to-r from-slate-400',
          )]: color === 'default',
          [clsx(
            'bg-orange-600',
            'data-[hover]:bg-orange-500',
            'data-[active]:bg-orange-400',
            'text-black',
            'bg-gradient-to-r from-amber-300',
          )]: color === 'warning',
          [clsx(
            'bg-emerald-600',
            'data-[hover]:bg-emerald-500',
            'data-[active]:bg-emerald-400',
            'text-white',
            'bg-gradient-to-r from-green-400',
          )]: color === 'success',
        },
        className,
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {
          !!startIcon && startIcon
        }
        {children}
      </span>
    </_Button>
  )
}
