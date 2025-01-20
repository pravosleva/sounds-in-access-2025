import { proxy } from 'valtio'
// import { mutateObject } from '~/utils/aux-ops'
// import clsx from 'clsx'
import pkg from '../../../package.json'
import { ELoadStatus, EProject, TSoundPack } from './types'
import gamesData from './data/games.json'
import tomAndJerryData from './data/tom-and-jerry.json'
import memsData from './data/mems.json'

const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || ''

class Singleton {
  private static instance: Singleton
  private _sounds: {
    [key in EProject]: TSoundPack;
  };
  private _cache: {
    [key: string]: {
      audio: HTMLAudioElement;
      status: ELoadStatus;
    }
  };
  private _activeAudio: null | HTMLAudioElement;

  private _common: {
    appVersion: string;
    isAudioActive: boolean;
    activeAudioStatus: ELoadStatus;
  }
  // NOTE: Etc. 1/3

  private constructor() {
    // this.uniquePageLoadKey = getRandomString(5)
    this._activeAudio = null
    this._common = proxy({
      appVersion: pkg.version,
      isAudioActive: false,
      activeAudioStatus: ELoadStatus.INACTIVE,
    })
    this._sounds = {
      'games': gamesData,
      'tom-and-jerry': tomAndJerryData,
      'mems': memsData,
      'what_where_when': {
        title: 'Что? Где? Когда?',
        descr: 'Музыка из шоу',
        bg: {
          src: '/static/projects/what-where-when/main.jpg',
        },
        items: [
          {
            title: 'Волчок',
            descr: 'Один из главных символов игры. Первые волчки выпускали на московском заводе «Красный пролетарий» с 1950-х годов',
            audio: '/static/projects/what-where-when/audio/volchok.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/volchok.jpg',
            },
          },
          {
            title: 'Внимание, вопрос',
            descr: '+ Гонг',
            audio: '/static/projects/what-where-when/audio/vnimanie_vopros.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/signal2.jpg',
            },
          },
          {
            title: 'Черный ящик',
            descr: '',
            audio: '/static/projects/what-where-when/audio/yashik.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/yashik.jpg',
            },
          },
          {
            title: 'Звук паузы (1-ый вариант)',
            descr: '',
            audio: '/static/projects/what-where-when/audio/pause1.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/pause1.jpg',
            },
          },
          {
            title: 'Звук паузы (2-ый вариант)',
            descr: '',
            audio: '/static/projects/what-where-when/audio/pause2.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/pause1.jpg',
            },
          },
          {
            title: 'Звук паузы (3-ый вариант)',
            descr: '',
            audio: '/static/projects/what-where-when/audio/pause3.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/pause1.jpg',
            },
          },
          {
            title: 'Звук паузы (4-ый вариант)',
            descr: '',
            audio: '/static/projects/what-where-when/audio/pause4.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/pause1.jpg',
            },
          },
          {
            title: '"Итак, следующий вопрос" (господин ведущий)',
            descr: '',
            audio: '/static/projects/what-where-when/audio/the-next-question.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/the-next-question.webp',
            },
          },
          {
            title: 'Интро или Суперблиц',
            descr: 'Музыка, которую включали, когда представляли игроков и ведущего (также объявление приза Суперблица). Суперблиц - это ситуация с тремя вопросами и одним игроком',
            audio: '/static/projects/what-where-when/audio/objavlenie-priza-superblica-2008-glenn-miller-in-the-mood.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/objavlenie-priza-superblica-2008-glenn-miller-in-the-mood.webp',
            },
          },
          {
            title: 'Гонг',
            descr: '',
            audio: '/static/projects/what-where-when/audio/gong.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/gong.jpg',
            },
          },
          {
            title: 'Гонг 1',
            descr: '',
            audio: '/static/projects/what-where-when/audio/gong1.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/gong.jpg',
            },
          },
          {
            title: 'Гонг 2',
            descr: '',
            audio: '/static/projects/what-where-when/audio/gong2.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/gong.jpg',
            },
          },
          {
            title: 'Сигнал 1',
            descr: 'Звук начала отсчета времени (и конца минуты обсуждения)',
            audio: '/static/projects/what-where-when/audio/signal1.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/signal1.jpg',
            },
          },
          {
            title: 'Сигнал 2',
            descr: 'Звук первого сигнала, который оповещает что скоро время закончится',
            audio: '/static/projects/what-where-when/audio/signal2.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/signal2.jpg',
            },
          },
          {
            title: 'А теперь внимание: Правильный ответ (Крюк)',
            descr: '+ Гонг',
            audio: '/static/projects/what-where-when/audio/vnimanie_pravilny_otvet.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/vnimanie_pravilny_otvet.jpg',
            },
          },
          {
            title: 'Знатоки ответили неправильно 1',
            descr: '',
            audio: '/static/projects/what-where-when/audio/fail1.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/fail1.webp',
            },
          },
          {
            title: 'Знатоки ответили неправильно 2',
            descr: '',
            audio: '/static/projects/what-where-when/audio/fail2.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/fail1.webp',
            },
          },
          {
            title: 'Знатоки ответили правильно',
            descr: '',
            audio: '/static/projects/what-where-when/audio/success.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/success.png',
            },
          },
          {
            title: 'Есть победители в игре',
            descr: 'В конце передачи',
            audio: '/static/projects/what-where-when/audio/winners-in-game.mp3',
            bg: {
              src: '/static/projects/what-where-when/audio/winners-in-game.webp',
            },
          },
        ],
      },
    }
    this._cache = {}
    // NOTE: Etc. 2/3
  }
  public static getInstance(): Singleton {
    if (!Singleton.instance) Singleton.instance = new Singleton()
    return Singleton.instance
  }

  public getProjectData({ project }: {
    project: EProject;
  }): TSoundPack | null {
    return this._sounds[project] || null
  }
  public get projects(): {
    [key in EProject]: TSoundPack;
  } {
    return this._sounds
  }
  public stopCurrentSound() {
    // NOTE: See also https://proweb63.ru/help/js/html5-audio-js
    if (!!this._activeAudio) {
      this._activeAudio.pause();
      this._activeAudio.currentTime = 0.0;
      this._activeAudio = null
      this._common.isAudioActive = false
    }
  }
  public playSound({ projectName, soundIndex, cb }: {
    projectName: EProject;
    soundIndex: number;
    cb?: {
      onLoadStart: (ev: Event) => void;
      onLoadProgress: (ev: Event) => void;
      onLoadError: (ev: string | Event, t: string | undefined) => void;
      onLoadSuccess: (ev: Event) => void;
    };
  }) {
    this.stopCurrentSound()
    try {
      if (!!this._sounds[projectName]) {
        if (!!this._sounds[projectName].items[soundIndex]) {
          const targetSrc = this._sounds[projectName].items[soundIndex].audio
          let audio
          if (!!this._cache[targetSrc] && this._cache[targetSrc].status !== ELoadStatus.ERRORED) {
            audio = this._cache[targetSrc].audio
          } else {
            audio = new Audio(`${PUBLIC_URL}${targetSrc}`)
            if (!!cb) {
              audio.onloadstart = (e) => {
                this._common.activeAudioStatus = ELoadStatus.STARTED
                cb.onLoadStart(e)
              }
              audio.onprogress = (e) => {
                cb.onLoadProgress(e)
              }
              audio.onloadeddata = (e) => {
                this._common.activeAudioStatus = ELoadStatus.LOADED
                cb.onLoadSuccess(e)
              }
              audio.onerror = (e, t) => {
                this._common.activeAudioStatus = ELoadStatus.ERRORED
                cb.onLoadError(e, t)
              }
            }
            audio.onended = (ev) => {
              this._common.isAudioActive = false
            }
            audio.load()
            this._cache[targetSrc] = {
              audio,
              status: this._common.activeAudioStatus,
            }
          }
          this._activeAudio = audio
          this._common.isAudioActive = true
          this._cache[targetSrc].audio.play()
        } else throw new Error('Нет такого аудио файла')
      } else throw new Error('Нет такого проекта')
    } catch (err) {
      console.warn(err)
    }
  }

  // -- NOTE: For example
  // public resetState() {
  //   try {
  //     // NOTE: Exp
  //     mutateObject({
  //       target: this._stepMachineState,
  //       source: initialStepMachineContextFormat,
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // --
  get common() {
    return this._common
  }
  // NOTE: Etc. 3/3
}

// NOTE: Valtio Instance (external proxy based multistore)
export const vi = Singleton.getInstance()

// NOTE: Also u can mutate vi.state if necessary
// For example: vi.state.imei.result.state = 'success'
