import { useCallback, useState, memo } from 'react'
import clsx from 'clsx'
// import { Link } from 'react-router-dom'
import { ItemAsPicture, Layout, ProjectHeader, ResponsiveBlock } from '~/common/components'
import { Button } from '~/common/components/'
import { ArrowLeft, Play, Plus, Stop, TrashX, Trash, PencilSquare } from '~/common/components/icons'
import baseClasses from '~/App.module.scss'
import { vi } from '~/common'
import { useSnapshot } from 'valtio/react'
import { Sheet } from 'react-modal-sheet'
import { CollapsibleBox } from '~/common/components/CollapsibleBox'
import classes from './RandomizersPage.module.scss'
import { ELoadStatus, EProject, TSoundPackItem } from '~/common/vi/types'
import { Link } from 'react-router-dom'

export const RandomizersPage = memo(() => {
  const [err, setErr] = useState<string | null>(null)
  const [activeRandomizerTitle, setActiveRandomizerTitle] = useState<string | null>(null)
  const localRandomizers = useSnapshot(vi.localRandomizers)
  const [isSheetOpened, setIsSheetOpened] = useState(false)
  const handleToggleSheet = useCallback((value?: boolean) => () => {
    if (typeof value === 'boolean') setIsSheetOpened(value)
    else setIsSheetOpened((s) => !s)
  }, [setIsSheetOpened])
  const handleCreateRandomizer = useCallback(() => {
    setErr(null)
    setActiveRandomizerTitle(null)
    const title = window.prompt('Enter title')
    if (!!title) vi.createLocalRandomizer({ title })
      .then(() => {
        setActiveRandomizerTitle(title)
        handleToggleSheet(true)()
      })
      .catch(({ message }) => setErr(`⛔️ ${message || 'No message'}`))
  }, [setErr, setActiveRandomizerTitle])

  const commonState = useSnapshot(vi.common)
  const handleEditRandomizer = useCallback(({ title }: {
    title: string;
  }) => () => {
    if (!!title) {
      setActiveRandomizerTitle(title)
      handleToggleSheet(true)()
    }
  }, [])
  const handleAddSoundToRandomizer = useCallback(({
    projectName,
    soundIndex,
    soundPackItem,
  }: {
    projectName: string;
    soundIndex: number;
    soundPackItem: TSoundPackItem;
  }) => {
    if (!!activeRandomizerTitle) {
      vi.addSoundToRandomizer({
        randomizedTitle: activeRandomizerTitle,
        soundData: {
          projectName: projectName as EProject,
          soundIndex,
          soundPackItem,
        },
      })
    }
  }, [activeRandomizerTitle])
  const handleRemoveSoundFromRandomizer = useCallback(({
    projectName,
    soundIndex,
    soundPackItem,
  }: {
    projectName: string;
    soundIndex: number;
    soundPackItem: TSoundPackItem;
  }) => {
    if (!!activeRandomizerTitle) {
      vi.removeSoundFromRandomizer({
        randomizedTitle: activeRandomizerTitle,
        soundData: {
          projectName: projectName as EProject,
          soundIndex,
          soundPackItem,
        },
      })
    }
  }, [activeRandomizerTitle])
  const handleDeleteRandomizer = useCallback(({ title }: {
    title: string;
  }) => () => {
    const isConfirmed = window.confirm('⚡️ Sure? Pack will be deleted')
    if (isConfirmed) vi.removeLocalRandomizer({ title })
  }, [])
  const handleClearRandomizer = useCallback(({ title }: {
    title: string;
  }) => () => {
    const isConfirmed = window.confirm('⚡️ Sure? Pack will be cleared')
    if (isConfirmed) vi.clearRandomizer({ randomizedTitle: title })
  }, [])
  const loadStatusState = useSnapshot(vi.loadStatus)
  // const activeAudioStatus = useSnapshot(vi.loadStatus[commonState.activeAudioSrc].value)

  return (
    <Layout>
      <ProjectHeader
        title={`Randomizers${!!err ? ` ${err}` : ''}`}
        bg={{
          src: '/static/projects/revolver.jpg',
        }}
      />

      <ResponsiveBlock
        className={clsx(
          'flex',
          'flex-col',
          'gap-4',                
        )}
        isLimitedForDesktop
        isPaddedMobile
      >
        {/* <pre>{JSON.stringify(localRandomizers, null, 2)}</pre> */}
        {
          Object.keys(localRandomizers).length > 0 ? (
            <ResponsiveBlock
              className={clsx(
                // 'flex',
                // 'flex-col',
                // 'gap-4',

                'grid',
                'grid-cols-1',
                'xs:grid-cols-2',
                'sm:grid-cols-3',  
                'gap-4',           
              )}
              isLimitedForDesktop
              // isPaddedMobile
            >
              {
                Object.keys(localRandomizers).map((title, i) => {
                  return (
                    <ItemAsPicture
                      isHeightMax
                      isDisabled={localRandomizers[title].length === 0}
                      key={`${title}-${i}`}
                      title={`${title} [${localRandomizers[title].length}]`}
                      descr='▶️ Play random'
                      onClick={() => {
                        setActiveRandomizerTitle(title)
                        vi.playRandomInRandomizer({ randomizerKey: title })
                          .then(console.log)
                          .catch(console.error)
                      }}
                      bg={{
                        src: // activeAudioBgSrc
                          activeRandomizerTitle === title && !!commonState.activeAudioBgSrc
                          ? commonState.activeAudioBgSrc
                          : '/static/projects/revolver.jpg',
                      }}
                      className='rounded-t-md'
                      actions={
                        <>
                          <Button
                            fullWidth
                            onClick={handleEditRandomizer({ title })}
                            color={activeRandomizerTitle === title ? 'warning' : 'default'}
                            // size='sm'
                            className={'rounded-none rounded-bl-md'}
                          >
                            <PencilSquare size={{ w: 16, h: 16 }} />
                          </Button>
                          <Button
                            fullWidth
                            color='default'
                            onClick={handleClearRandomizer({ title })}
                            isDisabled={localRandomizers[title].length === 0}
                            // size='sm'
                            className={'rounded-none'}
                          >
                            <TrashX size={{ w: 16, h: 16 }} />
                          </Button>
                          <Button
                            fullWidth
                            color='error'
                            onClick={handleDeleteRandomizer({ title })}
                            // size='sm'
                            className={'rounded-none rounded-br-md'}
                          >
                            <Trash size={{ w: 16, h: 16 }} />
                          </Button>
                          {/*
                            activeRandomizerTitle === title && !!commonState.isAudioActive && (
                              <Button
                                fullWidth
                                // style={{
                                //   flexBasis: '150px',
                                // }}
                                color='error'
                                onClick={() => {
                                  vi.stopCurrentSound()
                                }}
                              >
                                <Stop size={{ w: 16, h: 16 }} />
                              </Button>
                            )
                          */}
                        </>
                      }
                      // onClick={handleProjectClick({ index: i })}
                      bottomRightImage={
                        activeRandomizerTitle === title
                        && !!commonState.activeAudioSrc
                        && !!loadStatusState[commonState.activeAudioSrc]
                        && (
                          <span key={loadStatusState[commonState.activeAudioSrc].value}>
                            {
                              loadStatusState[commonState.activeAudioSrc].value === ELoadStatus.INACTIVE
                              ? <svg
                                style={{
                                  width: '20px',
                                  height: '20px',
                                }}
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" />
                              </svg>
                              : loadStatusState[commonState.activeAudioSrc].value === ELoadStatus.STARTED
                                ? <svg
                                  style={{
                                  width: '20px',
                                  height: '20px',
                                }}
                                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                  </svg>
                                : loadStatusState[commonState.activeAudioSrc].value === ELoadStatus.LOADED
                                  // ? commonState.activeAudioSrc === localRandomizers[title].
                                  // ? <Play size={{ w: 20, h: 20 }} />
                                  ? <svg
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" 
                                    fill="none" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                  </svg>
                                  : loadStatusState[commonState.activeAudioSrc].value === ELoadStatus.ERRORED
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
                    // <pre>{JSON.stringify(localRandomizers[title])}</pre>
                  )
                })
              }
            </ResponsiveBlock>
          ) : <em>No Randomizers yet...</em>
        }
      </ResponsiveBlock>
      <ResponsiveBlock
        className={clsx(
          baseClasses.stickyBottom,
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
        {
          commonState.isAudioActive && (
            <Button
              fullWidth
              color='error'
              onClick={() => {
                vi.stopCurrentSound()
              }}
              startIcon={<Stop size={{ w: 16, h: 16 }} />}
              className='rounded-md'
            >
              Stop
            </Button>
          )
        }
        <ResponsiveBlock
          className={clsx(
          baseClasses.stickyBottom,
            'grid',
            'grid-cols-2',
            'gap-4',
          )}
        >
          <Link to='/sounds'>
            <Button
              fullWidth
              color='default'
              // isDisabled={loadStatusState[commonState.] !== 'loaded'}
              startIcon={<ArrowLeft size={{ w: 18, h: 18 }} />}
              className='rounded-md'
            >
              <span>Back</span>
            </Button>
          </Link>
          <Button
            onClick={handleCreateRandomizer}
            color='success'
            // isDisabled={loadStatusState[commonState.] !== 'loaded'}
            startIcon={<Plus size={{ w: 18, h: 18 }} />}
            className='rounded-md'
          >
            <span>Create</span>
          </Button>
        </ResponsiveBlock>
        {/* <Link to='/sounds'>
          <ItemAsPicture
            title='Back'
            descr='Your personal packs'
            bg={{
              src: '/static/projects/revolver.jpg'
            }}
          />
        </Link> */}
      </ResponsiveBlock>

      <Sheet
        isOpen={isSheetOpened}
        onClose={handleToggleSheet(false)}
        detent="content-height"
      >
        <Sheet.Container
          className={clsx(
            baseClasses.stickyBottom,
            'md:grid',
            'md:grid-cols-2',
            'md:gap-0',

            'flex',
            'flex-col',
            'gap-0',

            'pl-4',
            'pr-4',
            'pb-4',
          )}
          style={{
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
          }}
        >
          <Sheet.Header />
          <Sheet.Content
            className={clsx(baseClasses.wrapper)}
            style={{
              // border: '1px dashed red',
            }}
          >
            <div
              className={clsx([
                // classes.bottomsheetContent,
                'pb-4',
                // baseClasses.stack2,
                'font-bold',
              ])}
            >
              {activeRandomizerTitle}
            </div>
            <div
              className={clsx(
                classes.wrapper,
                // 'flex',
                // 'flex-col',
                // 'gap-2',
              )}
            >
              <>
                {
                  Object.keys(vi.projects).map((projectName) => {
                    const projectData = vi.getProjectData({ project: projectName as EProject })
                    if (!projectData) return 'No data'
                    return (
                      <CollapsibleBox
                        key={projectName}
                        title={projectData.title}
                        level={1}
                      >
                        <ResponsiveBlock
                          key={projectName}
                          className={clsx(
                            'flex',
                            'flex-row',
                            'gap-1',
                            'pt-2',
                            'pb-4',
                          )}
                          // isLimitedForDesktop
                          // isPaddedMobile
                        >
                          {
                            projectData.items.map((soundPackItem, i) => {
                              const {
                                title,
                                descr,
                                bg,
                                audio,
                              } = soundPackItem
                              return (
                                <ResponsiveBlock
                                  key={`${projectName}-${title}`}
                                  className={clsx(
                                    'flex',
                                    'flex-row',
                                    'gap-1',  
                                    'pt-1',
                                    'pl-2',
                                    'pr-2',
                                    // 'pb-1',
                                  )}
                                  // isLimitedForDesktop
                                  // isPaddedMobile
                                  style={{ fontSize: 'small' }}
                                >
                                  <span><b>{title}</b>{!!descr && <span style={{ color: 'gray' }}>&nbsp;&nbsp;<em>{descr}</em></span>}</span>
                                  <ResponsiveBlock
                                    className={clsx(
                                      'grid',
                                      'grid-cols-4',
                                      'gap-[1px]',
                                    )}
                                  >
                                    <Button
                                      color={commonState.activeAudioSrc === audio ? 'warning' : 'default'}
                                      // size='sm'
                                      onClick={() => {
                                        vi.playSound({
                                          projectName: projectName as EProject,
                                          soundIndex: i,
                                        })
                                      }}
                                      className='rounded-l-md'
                                    >
                                      <Play size={{ w: 16, h: 16 }} />
                                    </Button>
                                    <Button
                                      color='default'
                                      // size='sm'
                                      onClick={() => vi.stopCurrentSound()}
                                    >
                                      <Stop size={{ w: 16, h: 16 }} />
                                    </Button>
                                    <Button
                                      color='success'
                                      isDisabled={
                                        !!activeRandomizerTitle
                                        && !!localRandomizers[activeRandomizerTitle]?.find((e) => e.soundPackItem.audio === audio)
                                      }
                                      // size='sm'
                                      onClick={() => {
                                        handleAddSoundToRandomizer({
                                          projectName,
                                          soundIndex: i,
                                          soundPackItem,
                                        })
                                      }}
                                    >
                                      <Plus size={{ w: 16, h: 16 }} />
                                    </Button>
                                    <Button
                                      color='error'
                                      isDisabled={
                                        !!activeRandomizerTitle
                                        && !localRandomizers[activeRandomizerTitle]?.find((e) => e.soundPackItem.audio === audio)
                                      }
                                      // size='sm'
                                      onClick={() => handleRemoveSoundFromRandomizer({
                                        projectName,
                                        soundIndex: i,
                                        soundPackItem,
                                      })}
                                      className='rounded-r-md'
                                    >
                                      <TrashX size={{ w: 16, h: 16 }} />
                                    </Button>
                                  </ResponsiveBlock>
                                </ResponsiveBlock>
                              )
                            })
                          }
                        </ResponsiveBlock>
                      </CollapsibleBox>
                    )
                  })
                }
              </>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </Layout>
  )
})
