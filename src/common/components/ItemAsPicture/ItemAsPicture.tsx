import { useInView } from 'react-hook-inview'
import clsx from 'clsx'
import classes from './ItemAsPicture.module.scss'
import { ELoadStatus } from '~/common/vi/types'

const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || ''

type TProps = {
  title: string;
  descr: string;
  bg: {
    src: string;
  };
  onClick?: () => void;
  bottomRightImage?: React.ReactNode;
}

export const ItemAsPicture = ({ title, bg, descr, onClick, bottomRightImage }: TProps) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  })
  return (
    <button
      ref={ref}
      className={clsx(
        classes.wrapperBg,
        'rounded',
        'rounded-md',
        'hover:shadow-xl',
        // 'hover:outline',
        // 'hover:outline-offset-4',
        // 'hover:outline-solid',
        
        'hover:ring-4',
        'hoer:ring-offset-2',
        'hover:ring-gray',
        
        'active:ring-4',
        'active:ring-offset-2',
        'active:ring-gray',

        'focus:ring-2',
        'focus:ring-offset-2',
        'focus:ring-red',

        'text-left',
        'w-full',
        {
          [classes.cursorPointer]: !!onClick,
        },
        classes.relativeBox,
      )}
      onClick={onClick}
      style={{
        backgroundImage: inView
          ? `url("${PUBLIC_URL}${bg.src}")`
          : 'none',
      }}
    >
      <div
        className={clsx(
          classes.content,
          'p-6',
          'flex',
          // 'items-center',
          'gap-4',
        )}
      >
        <div className={classes.title}>{title}</div>
        {!!descr && <div className={classes.descr}>{descr}</div>}
      </div>
      {
        !!bottomRightImage && (
          <span
            className={clsx(
              classes.absoluteLabel,
              classes.bottomRight,
            )}
          >
            {bottomRightImage}
          </span>
        )
      }
    </button>
  )
}
