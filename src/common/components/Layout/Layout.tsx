import clsx from 'clsx'
import classes from './Layout.module.scss'

type TProps = {
  children: React.ReactNode;
}

export const Layout = ({ children }: TProps) => {
  return (
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
      style={{
        // minHeight: '100%',
        // border: '2px solid black'
      }}
    >
      {children}
    </div>
  )
}
