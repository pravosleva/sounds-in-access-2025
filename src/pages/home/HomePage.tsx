import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { ItemAsPicture, Layout, ResponsiveBlock } from '~/common/components'
import classes from './HomePage.module.scss'

export const HomePage = () => {
  return (
    <Layout>
      <ResponsiveBlock
        className={clsx(
          classes.wrapper,
          classes.re
          // 'md:grid',
          // 'md:grid-cols-3',
          // 'md:gap-4',

          // 'flex',
          // 'flex-col',
          // 'gap-4',
          // 'pt-2',
          // 'pb-2',
        )}
        isLimitedForDesktop
        isPaddedMobile
      >
        <div
          className={clsx(
            classes.absoluteBadge,
            classes.topRight,
          )}
        >
          <Link
            to="/sounds"
            className="text-purple-400 underline"
          >
            <ItemAsPicture
              // isHeightMax
              title='Sounds'
              descr=''
              bg={{
                src: '/static/amplitude.svg'
              }}
              className={clsx(
                'rounded',
                'rounded-md',
              )}
            />
          </Link>
        </div>

        <div
          className={clsx(
            classes.absoluteBadge,
            classes.bottomLeft,
          )}
        >
          <Link
            to="/randomizers"
            className="text-purple-400 underline"
          >
            <ItemAsPicture
              // isHeightMax
              title='Randomizers'
              descr=''
              bg={{
                src: '/static/projects/revolver.jpg'
              }}
              className={clsx(
                'rounded',
                'rounded-md',
              )}
            />
          </Link>
        </div>
      </ResponsiveBlock>
    </Layout>
  )
}
