import clsx from 'clsx'
import { useMemo, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { vi } from '~/common'
import { ItemAsPicture, Layout, ProjectHeader, ResponsiveBlock } from '~/common/components'
import { EProject } from '~/common/vi/types'
import baseClasses from '~/App.module.scss'
// import { useProxy } from 'valtio/utils'
import { useSnapshot } from 'valtio/react'
// import { Button } from '@headlessui/react'
import { Button } from '~/common/components/'

export const ProjectPage = () => {
  const params = useParams()
  const projectData = useMemo(() => !!params.project
    && typeof params.project === 'string'
    && Object.values(EProject).includes(params.project as EProject)
    ? vi.getProjectData({ project: params.project as EProject })
    : null, [params.project])
  const handleProjectClick = useCallback(({ index }: {
    index: number;
  }) => () => {
    vi.playSound({
      projectName: params.project as EProject,
      soundIndex: index,
      cb: {
        onLoadStart: (ev) => {
          console.log(ev)
        },
        onLoadProgress: (ev) => {
          console.log(ev)
        },
        onLoadError: (ev) => {
          console.log(ev)
        },
        onLoadSuccess: (ev) => {
          console.log(ev)
        },
      },
    })
  }, [params.project])
  const commonState = useSnapshot(vi.common)
  const handleStopAudio = useCallback(() => {
    vi.stopCurrentSound()
  }, [])

  return (
    <Layout>
      <>
        {
          !!projectData
          ? (
            <>
              <ProjectHeader
                title={clsx(projectData.title)}
                bg={projectData.bg}
              />
              
              <ResponsiveBlock
                // style={{ border: '1px solid red' }}
                className={clsx(
                  'flex',
                  'flex-col',
                  'gap-4',

                  'sm:grid',
                  'sm:grid-cols-3',
                  'sm:gap-4',                  
                )}
                isLimitedForDesktop
                isPaddedMobile
              >
                {
                  projectData.items.map(({
                    title,
                    descr,
                    bg,
                  }, i) => {
                    return (
                      <ItemAsPicture
                        key={i}
                        title={`▶️ ${title}`}
                        descr={descr}
                        bg={bg}
                        onClick={handleProjectClick({ index: i })}
                      />
                    )
                  })
                }
              </ResponsiveBlock>

              <ResponsiveBlock
                // style={{ border: '1px solid red' }}
                className={clsx(
                  baseClasses.stickyBottom,
                  'md:grid',
                  'md:grid-cols-2',
                  'md:gap-4',

                  'flex',
                  'flex-col',
                  'gap-2',

                  'pt-4',
                  'pb-4',
                  'backdrop-blur-sm',

                  'border-t-2',
                  'border-white',
                )}
                isLimitedForDesktop
                isPaddedMobile
                style={{
                  // backgroundColor: '#fff',
                  // border: '1px solid red',
                  marginTop: 'auto',
                }}
              >
                <Link
                  to='/sounds'
                >
                  <Button
                    color='warning'
                    startIcon={
                      <svg
                        style={{
                          height: '18px',
                          width: '18px',
                        }}
                        data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                      </svg>
                    }
                  >
                    All projects
                  </Button>
                </Link>
                {
                  !!commonState.isAudioActive && (
                    <Button
                      onClick={handleStopAudio}
                      color='error'
                      isDisabled={commonState.activeAudioStatus !== 'loaded'}
                      startIcon={
                        <svg
                          style={{
                            height: '18px',
                            width: '18px',
                          }}
                          data-slot="icon"
                          fill="none"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"></path>
                        </svg>
                      }
                    >
                      <span>Stop</span>
                      <span>[{commonState.activeAudioStatus}]</span>
                    </Button>
                  )
                }
              </ResponsiveBlock>
            </>
          ) : (
            <em>Not found</em>
          )
        }
      </>
    </Layout>
  )
}
