import clsx from 'clsx'
import { ResponsiveBlock } from '../ResponsiveBlock'
import classes from './ProjectHeader.module.scss'
import baseClasses from '~/App.module.scss'

const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || ''

type TProps = {
  title: string;
  bg: {
    src: string;
  };
}

export const ProjectHeader = ({ title, bg }: TProps) => {
  return (
    <ResponsiveBlock
      isLimitedForDesktop
      className={clsx(
        baseClasses.stickyTop,
        // 'bg-gray-700',
        // 'backdrop-blur-sm',
        
        'text-white',
        'font-bold',
        'md:rounded-bl-md',
        'md:rounded-br-md',
        'bg-center',

        'shadow-md',
        'shadow-white',
      )}
      style={{
        backgroundImage: `url("${PUBLIC_URL}${bg.src}")`,
        // backgroundPosition: 'center',
      }}
    >
      <div
        className={clsx(
          classes.wrapperBg,
          // 'md:rounded-bl-md',
          // 'md:rounded-br-md',
        )}
      >
        <div
          className={clsx(
            classes.content,
            'p-4',
            'md:rounded-bl-md',
            'md:rounded-br-md',
          )}
        >{title}</div>
      </div>
    </ResponsiveBlock>
  )
}
