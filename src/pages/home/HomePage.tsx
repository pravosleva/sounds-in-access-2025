import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { Layout, ResponsiveBlock } from '~/common/components'

export const HomePage = () => {
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
          'pt-2',
          'pb-2',
        )}
        isLimitedForDesktop
        isPaddedMobile
      >
        <Link
          to="/sounds"
          className="text-purple-400 underline"
        >
          All Sound Packs
        </Link>
        <Link
          to="/randomizers"
          className="text-purple-400 underline"
        >
          All Randomizers
        </Link>
      </ResponsiveBlock>
    </Layout>
  )
}
