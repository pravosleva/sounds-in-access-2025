import { proxy } from 'valtio'
// import { mutateObject } from '~/utils/aux-ops'
// import clsx from 'clsx'
import pkg from '../../../package.json'
import { ELoadStatus, EProject, TSoundPack, TSoundPackItem } from './types'
import gamesData from './data/games.json'
import tomAndJerryData from './data/tom-and-jerry.json'
import memsData from './data/mems.json'
import wwwData from './data/what_where_when.json'
import clicksData from './data/clicks.json'
import failsData from './data/fails.json'
import introData from './data/intro.json'
import plopData from './data/plop.json'
import successData from './data/success.json'
import gongData from './data/gong.json'
import loadData from './data/load.json'
import trillerData from './data/triller.json'
import bratData from './data/brat-1-2.json'
import crimeRussiaData from './data/crime-russia.json'
import madeInUSSRData from './data/ussr-films.json'
import piratedVideoTape from './data/pirated-video-tape.json'
import { getNormalized } from '~/common/utils'

const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || ''

type TSoundData = {
  projectName: EProject;
  soundIndex: number;
  soundPackItem: TSoundPackItem;
}

class Singleton {
  private static instance: Singleton
  private _sounds: {
    [key in EProject]: TSoundPack;
  };
  public _localRandomizers: {
    value: {
      [key: string]: TSoundData[];
    }
  };
  private _cache: {
    [key: string]: {
      audio: HTMLAudioElement;
      // loadStatus: ELoadStatus;
    }
  };
  private _activeAudio: null | HTMLAudioElement;

  private _common: {
    appVersion: string;
    isAudioActive: boolean;
    // activeAudioStatus: ELoadStatus;
    activeAudioSrc: string | null;
    activeAudioBgSrc: string | null;
  }
  private _loadStatus: {
    [key: string]: {
      value: ELoadStatus;
    }
  }
  // NOTE: Etc. 1/3

  private constructor() {
    // this.uniquePageLoadKey = getRandomString(5)
    this._activeAudio = null
    this._common = proxy({
      appVersion: pkg.version,
      isAudioActive: false,
      // activeAudioStatus: ELoadStatus.INACTIVE,
      activeAudioSrc: null,
      activeAudioBgSrc: null,
    })
    this._loadStatus = proxy({})
    this._sounds = {
      'what_where_when': wwwData,
      'ussr-films': madeInUSSRData,
      'mems': memsData,
      'pirated-video-tape': piratedVideoTape,
      'intro': introData,
      'gong': gongData,
      'clicks': clicksData,
      'fails': failsData,
      'plop': plopData,
      'success': successData,
      'load': loadData,
      'triller': trillerData,
      'crime-russia': crimeRussiaData,
      'brat-1-2': bratData,
      'games': gamesData,
      'tom-and-jerry': tomAndJerryData,
    }

    let randomizersFromLS
    try {
      randomizersFromLS = JSON.parse(localStorage.getItem('sounds') || '{}')
    } catch (err) {
      console.warn(err)
      randomizersFromLS= {}
    }
    // vi.setLocalRandomizers({ value: randomizersFromLS })
    this._localRandomizers = proxy({
      value: randomizersFromLS,
    })

    this._cache = {}
    // NOTE: Etc. 2/3
  }
  public static getInstance(): Singleton {
    if (!Singleton.instance) Singleton.instance = new Singleton()
    return Singleton.instance
  }

  // -- NOTE: Local randomizers
  public setLocalRandomizers({ value }: {
    value: {
      [key: string]: TSoundData[];
    };
  }) {
    this._localRandomizers.value = value
  }
  public createLocalRandomizer({ title }: {
    title: string;
  }): Promise<{ ok: boolean; message?: string }> {
    const normalized = getNormalized(title)
    switch (true) {
      case typeof title !== 'string' || !normalized:
        return Promise.reject({ ok: false, message: 'Incorrect value' })
      case !!this._localRandomizers.value[normalized]:
        return Promise.reject({ ok: false, message: 'Такой пакет уже есть' })
      default:
        this._localRandomizers.value[normalized] = []
        // localStorage.setItem('sounds', JSON.stringify(this._localRandomizers))
        return Promise.resolve({ ok: true, message: 'Created' })
    }
  }
  public removeLocalRandomizer({ title }: {
    title: string;
  }): Promise<{ ok: boolean; message?: string }> {
    switch (true) {
      case typeof title !== 'string':
        return Promise.reject({ ok: false, message: 'Incorrect value' })
      case !title:
        return Promise.reject({ ok: false, message: 'Нет такого пакета' })
      default:
        delete this._localRandomizers.value[title]
        // localStorage.setItem('sounds', JSON.stringify(this._localRandomizers))
        return Promise.resolve({ ok: true, message: 'Removed' })
    }
  }
  public addSoundToRandomizer({ randomizedTitle, soundData }: {
    randomizedTitle: string;
    soundData: TSoundData;
  }) {
    switch (true) {
      case typeof randomizedTitle !== 'string' || !randomizedTitle:
        return Promise.reject({ ok: false, message: 'Incorrect value' })
      case
        typeof this._localRandomizers.value[randomizedTitle] === 'undefined'
        || !Array.isArray(this._localRandomizers.value[randomizedTitle]):
        return Promise.reject({ ok: false, message: 'Нет такого пакета' })
      default: {
        const isAlreadyExists = this._localRandomizers.value[randomizedTitle].some(({ projectName, soundIndex }) => {
          return projectName === soundData.projectName && soundIndex === soundData.soundIndex
        })
        if (isAlreadyExists) return Promise.reject({ ok: false, message: 'Уже добавлено' })
        else {
          this._localRandomizers.value[randomizedTitle].unshift(soundData)
          // localStorage.setItem('sounds', JSON.stringify(this._localRandomizers))
          return Promise.resolve({ ok: true, message: 'Added to Randomizer' })
        }
      }
    }
  }
  public removeSoundFromRandomizer({ randomizedTitle, soundData }: {
    randomizedTitle: string;
    soundData: TSoundData;
  }) {
    switch (true) {
      case typeof randomizedTitle !== 'string' || !randomizedTitle:
        return Promise.reject({ ok: false, message: 'Incorrect value' })
      case
        typeof this._localRandomizers.value[randomizedTitle] === 'undefined'
        || !Array.isArray(this._localRandomizers.value[randomizedTitle]):
        return Promise.reject({ ok: false, message: 'Нет такого пакета' })
      default: {
        const isAlreadyExists = this._localRandomizers.value[randomizedTitle].some(({ projectName, soundIndex }) => {
          return (projectName === soundData.projectName && soundIndex === soundData.soundIndex)
        })
        if (!isAlreadyExists) return Promise.reject({ ok: false, message: 'Не найдено' })
        else {
          const newList = this._localRandomizers.value[randomizedTitle].filter(({ soundPackItem }) => {
            return soundPackItem.audio !== soundData.soundPackItem.audio
          })
          this._localRandomizers.value[randomizedTitle] = newList
          // localStorage.setItem('sounds', JSON.stringify(this._localRandomizers))
          return Promise.resolve({ ok: true, message: 'Removed from Randomizer' })
        }
      }
    }
  }
  public playRandomInRandomizer({
    randomizerKey,
  }: {
    randomizerKey: string;
  }) {
    const targetSoundPack = this._localRandomizers.value[randomizerKey]
    switch (true) {
      case typeof targetSoundPack === 'undefined':
        return Promise.reject({ ok: false, message: 'Not found' })
      case !Array.isArray(targetSoundPack):
        return Promise.reject({ ok: false, message: 'Incorrect soundpack format' })
      case targetSoundPack.length === 0:
        return Promise.reject({ ok: false, message: 'Empty randomizer' })
      default: {
        const getRandomValue = ({ items }: { items: any[] }) => {
          if (!Array.isArray(items)) return 'getRandomValue ERR: Incorrect arg'
          const randomIndex = Math.floor(Math.random() * items.length)
        
          return items[randomIndex]
        }
        const randomItem = getRandomValue({ items: targetSoundPack })
        this.playSound({ projectName: randomItem.projectName, soundIndex: randomItem.soundIndex })
        return Promise.resolve({ ok: true })
      }
    }
  }
  public clearRandomizer({ randomizedTitle }: {
    randomizedTitle: string;
  }) {
    switch (true) {
      case typeof randomizedTitle !== 'string' || !randomizedTitle:
        return Promise.reject({ ok: false, message: 'Incorrect value' })
      case
        typeof this._localRandomizers.value[randomizedTitle] === 'undefined'
        || !Array.isArray(this._localRandomizers.value[randomizedTitle]):
        return Promise.reject({ ok: false, message: 'Нет такого пакета' })
      default: {
        const isAlreadyExists = Array.isArray(this._localRandomizers.value[randomizedTitle])
        if (!isAlreadyExists) return Promise.reject({ ok: false, message: 'Не найдено' })
        else {
          this._localRandomizers.value[randomizedTitle] = []
          // localStorage.setItem('sounds', JSON.stringify(this._localRandomizers))
          return Promise.resolve({ ok: true, message: 'Removed from Randomizer' })
        }
      }
    }
  }
  // --

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
      this._common.activeAudioSrc = null
      this._common.activeAudioBgSrc = null
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
          if (
            !!this._cache[targetSrc]
            && this._loadStatus[targetSrc].value === ELoadStatus.LOADED
          )
            audio = this._cache[targetSrc].audio
          else {
            audio = new Audio(`${PUBLIC_URL}${targetSrc}`)
            
            this._cache[targetSrc] = {
              audio,
            }
            this._loadStatus[targetSrc] = {
              value: ELoadStatus.INACTIVE,
            }

            audio.onloadstart = (e) => {
              this._loadStatus[targetSrc].value = ELoadStatus.STARTED
              if (!!cb) cb.onLoadStart(e)
            }
            audio.onprogress = (e) => {
              if (!!cb) cb.onLoadProgress(e)
            }
            audio.onloadeddata = (e) => {
              this._loadStatus[targetSrc].value = ELoadStatus.LOADED
              if (!!cb) cb.onLoadSuccess(e)
            }
            audio.onerror = (e, t) => {
              this._loadStatus[targetSrc].value = ELoadStatus.ERRORED
              if (!!cb) cb.onLoadError(e, t)
            }
            audio.onended = (ev) => {
              this._common.isAudioActive = false
              this._common.activeAudioSrc = null
              this._common.activeAudioBgSrc = null
            }
            audio.load()
          }
          this._activeAudio = audio
          this._common.isAudioActive = true
          this._common.activeAudioSrc = targetSrc
          this._common.activeAudioBgSrc = this._sounds[projectName].items[soundIndex].bg.src
          
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
  get loadStatus() {
    return this._loadStatus
  }
  get localRandomizers() {
    return this._localRandomizers.value
  }
  // NOTE: Etc. 3/3
}

// NOTE: Valtio Instance (external proxy based multistore)
export const vi = Singleton.getInstance()

// NOTE: Also u can mutate vi.state if necessary
// For example: vi.state.imei.result.state = 'success'
