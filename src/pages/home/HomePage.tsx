import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { ItemAsPicture, Layout, ResponsiveBlock, Tape } from '~/common/components'
import classes from './HomePage.module.scss'
import baseClasses from '~/App.module.scss'
import { useSnapshot } from 'valtio/react'
import { vi } from '~/common'

export const HomePage = () => {
  const commonState = useSnapshot(vi.common)
  
  return (
    <Layout
      style={{
        // overflowY: 'hidden',
        // border: '1px solid red',
        // maxHeight: '100dvh',
      }}
    >
      <ResponsiveBlock
        className={clsx(
          baseClasses.stickyTop,
          // 'md:grid',
          // 'md:grid-cols-2',
          // 'md:gap-4',

          'flex',
          'flex-row',
          'gap-2',

          'pt-4',
          'pb-4',
          'backdrop-blur-md',
          'md:backdrop-blur-sm',

          'border-t-2',
          'border-white',
        )}
        isLimitedForDesktop
        isPaddedMobile
        style={{
          // marginTop: 'auto',
        }}
      >
        <Link
          style={{ width: '100%' }}
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
      </ResponsiveBlock>
      <div
        className={classes.container}
        style={{
          position: 'fixed'
        }}
      >
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
          // isLimitedForDesktop
          // isPaddedMobile
        >
          <Tape />
          {/* <div
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
          </div> */}

          {/* <div
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
          </div> */}
        </ResponsiveBlock>
      </div>
      <ResponsiveBlock
        className={clsx(
          baseClasses.stickyBottom,
          // 'md:grid',
          // 'md:grid-cols-2',
          // 'md:gap-4',

          'flex',
          'flex-row',
          'gap-2',

          'pt-4',
          'pb-4',
          'backdrop-blur-md',
          'md:backdrop-blur-sm',

          'border-t-2',
          'border-white',
        )}
        isLimitedForDesktop
        isPaddedMobile
        style={{
          marginTop: 'auto',
        }}
      >
        <Link
          style={{ width: '100%' }}
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
      </ResponsiveBlock>
    </Layout>
  )
}
