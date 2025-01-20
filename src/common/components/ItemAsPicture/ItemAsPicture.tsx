import clsx from 'clsx'
import classes from './ItemAsPicture.module.scss'

const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || ''

type TProps = {
  title: string;
  descr: string;
  bg: {
    src: string;
  };
  onClick?: () => void;
}

export const ItemAsPicture = ({ title, bg, descr, onClick }: TProps) => {
  return (
    <div
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
        {
          [classes.cursorPointer]: !!onClick,
        }
      )}
      onClick={onClick}
      style={{
        backgroundImage: `url("${PUBLIC_URL}${bg.src}")`,
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
    </div>
  )
}
