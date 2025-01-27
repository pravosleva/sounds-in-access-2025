import clsx from 'clsx'
import classes from './Layout.module.scss'
import { FixedScrollTopBtn, FixedStopBtn } from './components'
import { ErrorBoundary } from '~/common';
import { CSSProperties } from 'react';

type TProps = {
  children: React.ReactNode;
  style?: CSSProperties;
}

export const Layout = ({ children, style }: TProps) => {
  return (
    <>
      <div
        className={
          clsx(
            classes.appWrapper,
            // 'p-10',

            'flex',
            'flex-col',
            'gap-4',
            'full-w',

            // 'border',
            // 'shadow-xl',
            // 'border-gray-50',
            // 'rounded-xl',
            // 'items-center',
          )
        }
        style={style || {}}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </div>
      <FixedScrollTopBtn />
      <FixedStopBtn />
    </>
  )
}
