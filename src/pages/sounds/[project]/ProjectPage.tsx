import clsx from 'clsx'
import { useMemo, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { vi } from '~/common'
import { ItemAsPicture, Layout, ProjectHeader, ResponsiveBlock } from '~/common/components'
import { ELoadStatus, EProject } from '~/common/vi/types'
import baseClasses from '~/App.module.scss'
import { useSnapshot } from 'valtio/react'
// import { useProxy } from 'valtio/utils'
import { Button } from '~/common/components/'
import { Play } from '~/common/components/icons'

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
  const loadStatusState = useSnapshot(vi.loadStatus)
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
                className={clsx(
                  'flex',
                  'flex-col',
                  'gap-4',
                  'grid-cols-1',

                  // 'xs:grid',
                  // 'xs:grid-cols-2',
                  'sm:grid',
                  'sm:grid-cols-3',
                )}
                isLimitedForDesktop
                isPaddedMobile
              >
                {
                  projectData.items.map(({
                    title,
                    descr,
                    bg,
                    audio,
                  }, i) => {
                    return (
                      <ItemAsPicture
                        key={i}
                        title={`▶️ ${title}`}
                        descr={descr}
                        bg={bg}
                        onClick={handleProjectClick({ index: i })}
                        className='rounded-md'
                        bottomRightImage={
                          !!loadStatusState[audio] && (
                            <span>
                              {
                                loadStatusState[audio].value === ELoadStatus.INACTIVE
                                ? <svg
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                  }}
                                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
                                </svg>
                                : loadStatusState[audio].value === ELoadStatus.STARTED
                                  ? <svg
                                    style={{
                                    width: '20px',
                                    height: '20px',
                                  }}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                  : loadStatusState[audio].value === ELoadStatus.LOADED
                                    ? commonState.activeAudioSrc === audio
                                      ? <Play size={{ w: 20, h: 20 }} />
                                      : <svg
                                        style={{
                                          width: '20px',
                                          height: '20px',
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" 
                                        fill="none" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                      </svg>
                                    : loadStatusState[audio].value === ELoadStatus.ERRORED
                                    ? <svg
                                        style={{
                                          width: '20px',
                                          height: '20px',
                                        }}
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                      </svg>
                                    : null
                              }
                            </span>
                          )
                        }
                      />
                    )
                  })
                }
              </ResponsiveBlock>

              <ResponsiveBlock
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
                <Link to='/sounds'>
                  <Button
                    fullWidth
                    color='warning'
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
                    All packs
                  </Button>
                </Link>
                {
                  !!commonState.isAudioActive && (
                    <Button
                      fullWidth
                      onClick={handleStopAudio}
                      color='error'
                      // isDisabled={loadStatusState[commonState.] !== 'loaded'}
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
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"></path>
                        </svg>
                      }
                      className='rounded-md'
                    >
                      <span>Stop</span>
                      {
                        !!commonState.activeAudioSrc && (
                          <span>[{loadStatusState[commonState.activeAudioSrc].value}]</span>
                        )
                      }
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
