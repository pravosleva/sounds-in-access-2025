import { Layout, ItemAsPicture, ResponsiveBlock } from '~/common/components'
import { vi } from '~/common/vi'
import { Link } from 'react-router-dom'
import { EProject } from '~/common/vi/types'
import clsx from 'clsx'

export const SoundsPage = () => {
  return (
    <Layout>
      <ResponsiveBlock
        // style={{ border: '1px solid red' }}
        className={clsx(
          'md:grid',
          'md:grid-cols-3',
          'md:gap-4',

          'flex',
          'flex-col',
          'gap-4',
          'pt-4',
          'pb-4',
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
                  title={vi.projects[(projectName as EProject)].title}
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
    </Layout>
  )
}
