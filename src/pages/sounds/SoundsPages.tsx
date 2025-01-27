import { memo } from 'react'
import { Layout, ItemAsPicture, ResponsiveBlock, Button } from '~/common/components'
import { vi } from '~/common/vi'
import { Link } from 'react-router-dom'
import { EProject } from '~/common/vi/types'
import clsx from 'clsx'
import baseClasses from '~/App.module.scss'
import { useSnapshot } from 'valtio/react'
// import classes from './SoundsPage.module.scss'

export const SoundsPage = memo(() => {
  const localRandomizers = useSnapshot(vi.localRandomizers)

  return (
    <Layout>
      <ResponsiveBlock
        // style={{ border: '1px solid red' }}
        className={clsx(
          'flex',
          'flex-col',
          'gap-4',

          // 'grid',
          // 'auto-rows-max',
          // 'grid-cols-2',
          // 'gap-0',
          'sm:grid',
          'sm:grid-cols-3',
          'sm:gap-4',
          // 'pt-0',
          // 'pb-0',

          'p-4',
          'sm:pt-4',
          'sm:pb-4',

          // classes.wrapper,
        )}
        isLimitedForDesktop
        // isPaddedMobile
        isPaddedDesktop
      >
        {
          Object.keys(vi.projects).map((projectName) => {
            return (
              <Link
                key={projectName}
                to={`/sounds/${projectName}`}
                className='height-max'
              >
                <ItemAsPicture
                  isHeightMax
                  title={`${vi.projects[(projectName as EProject)].title} [${vi.projects[(projectName as EProject)].items.length}]`}
                  descr={vi.projects[(projectName as EProject)].descr}
                  bg={{
                    src: vi.projects[(projectName as EProject)].bg.src
                  }}
                  className={clsx(
                    'rounded-md',
                    'sm:rounded',
                    'sm:rounded-md',
                  )}
                />
              </Link>
            )
          })
        }
      </ResponsiveBlock>
      <ResponsiveBlock
        className={clsx(
          baseClasses.stickyBottom,
          // 'md:grid',
          // 'md:grid-cols-2',
          // 'md:gap-4',

          'flex',
          'flex-col',
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
        <Link to='/randomizers'>
          <ItemAsPicture
            title={`Randomizers [${Object.keys(localRandomizers).length}]`}
            descr='' // 'Your personal packs'
            bg={{
              src: '/static/projects/revolver.jpg'
            }}
            className={clsx(
              'rounded-md',
            )}
          />
        </Link>
        <Link to='/'>
          <Button
            fullWidth
            color='default'
            startIcon={
              <svg
                style={{
                  height: '18px',
                  width: '18px',
                }}
                data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
              </svg>
            }
            className='rounded-md'
          >
            Home
          </Button>
        </Link>
      </ResponsiveBlock>
    </Layout>
  )
})
