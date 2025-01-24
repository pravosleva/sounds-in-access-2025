import { useRef, useCallback, memo, useEffect } from 'react'
import { useScrollPosition, IWindowDims } from '~/common/hooks/useScrollPosition'
import clsx from 'clsx'
import classes from './FixedScrollTopBtn.module.scss'
import { scrollTop, scrollTopExtra } from '~/common/components/Layout/utils'
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { ArrowUp } from '~/common/components/icons'
import { useSearchParams } from 'react-router-dom'

export const FixedScrollTopBtn = memo(() => {
  const [, isMoreThan2Screens]: [IWindowDims, boolean] = useScrollPosition()
  const ref = useRef<HTMLDivElement>(null)
  const handleClick = useCallback(() => {
    scrollTop()
  }, [])

  const [urlSearchParams] = useSearchParams()
  useEffect(() => {
    scrollTopExtra()

    const jobIdToScroll = urlSearchParams.get('lastSeenJob')
    if (!!jobIdToScroll) {
      setTimeout(() => {
        const targetElm = document.getElementById(`job_list_item_${jobIdToScroll}`)
        if (!!targetElm) {
          targetElm.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, urlSearchParams])

  return (
    <>
      {typeof window !== 'undefined' && (
        <div
          ref={ref}
          onClick={handleClick}
          className={clsx(
            classes.wrapper,
            classes.fixed,
            {
              [classes.isRequired]: isMoreThan2Screens,
            },
            'backdrop-blur-sm',
            // 'text-white',
          )}
        >
          <ArrowUp size={{ w: 18, h: 18 }} />
        </div>
      )}
    </>
  )
})
