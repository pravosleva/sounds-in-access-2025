import { vi } from '~/common/vi'
import classes from './FixedStopBtn.module.scss'
import clsx from 'clsx'
import { useSnapshot } from 'valtio'
import { Stop } from '~/common/components/icons'

export const FixedStopBtn = () => {
  const commonState = useSnapshot(vi.common)
  return (
    <>
      {typeof window !== 'undefined' && (
        <div
          // ref={ref}
          onClick={() => {
            vi.stopCurrentSound()
          }}
          className={clsx(
            classes.wrapper,
            classes.fixed,
            {
              [classes.isRequired]: commonState.isAudioActive,
            },
            // 'background-color-lightgray',
            'bg-red-600/70',
            'text-white',
            'backdrop-blur-sm',
            'shadow-lg',
          )}
        >
          <Stop size={{ w: 18, h: 18 }} />
        </div>
      )}
    </>
  )
}
