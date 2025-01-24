import { memo } from 'react'
import { Layout, ItemAsPicture, ResponsiveBlock } from '~/common/components'
import { vi } from '~/common/vi'
import { Link } from 'react-router-dom'
import { EProject } from '~/common/vi/types'
import clsx from 'clsx'
import baseClasses from '~/App.module.scss'
import { useSnapshot } from 'valtio/react'

export const SoundsPage = memo(() => {
  const localRandomizers = useSnapshot(vi.localRandomizers)

  return (
    <Layout>
      <ResponsiveBlock
        // style={{ border: '1px solid red' }}
        className={clsx(
          'pt-4',
          'pb-4',

          'flex',
          'flex-col',
          'gap-4',
          
          'sm:grid',
          'sm:grid-cols-3',
          // 'sm:grid-rows-auto',
          'sm:gap-4',
        )}
        isLimitedForDesktop
        isPaddedMobile
      >
        {
          Object.keys(vi.projects).map((projectName) => {
            return (
              <Link
                key={projectName}
                to={`/sounds/${projectName}`}
                // className='text-purple-400'
              >
                <ItemAsPicture
                  title={`${vi.projects[(projectName as EProject)].title} [${vi.projects[(projectName as EProject)].items.length}]`}
                  descr={vi.projects[(projectName as EProject)].descr}
                  bg={{
                    src: vi.projects[(projectName as EProject)].bg.src
                  }}
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
            descr='Your personal packs'
            bg={{
              src: '/static/projects/revolver.jpg'
            }}
          />
        </Link>
      </ResponsiveBlock>
    </Layout>
  )
})
