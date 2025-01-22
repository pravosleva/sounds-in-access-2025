import { proxy } from 'valtio'
// import { mutateObject } from '~/utils/aux-ops'
// import clsx from 'clsx'
import pkg from '../../../package.json'
import { ELoadStatus, EProject, TSoundPack } from './types'
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

const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || ''

class Singleton {
  private static instance: Singleton
  private _sounds: {
    [key in EProject]: TSoundPack;
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
    })
    this._loadStatus = proxy({})
    this._sounds = {
      'what_where_when': wwwData,
      'mems': memsData,
      'intro': introData,
      'gong': gongData,
      'clicks': clicksData,
      'fails': failsData,
      'plop': plopData,
      'success': successData,
      'load': loadData,
      'triller': trillerData,
      'games': gamesData,
      'tom-and-jerry': tomAndJerryData,
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
      this._common.activeAudioSrc = null
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
              // loadStatus: this._common.activeAudioStatus,
            }
            this._loadStatus[targetSrc] = {
              value: ELoadStatus.INACTIVE,
            }

            if (!!cb) {
              audio.onloadstart = (e) => {
                // this._common.activeAudioStatus = ELoadStatus.STARTED
                this._loadStatus[targetSrc].value = ELoadStatus.STARTED
                cb.onLoadStart(e)
              }
              audio.onprogress = (e) => {
                cb.onLoadProgress(e)
              }
              audio.onloadeddata = (e) => {
                // this._common.activeAudioStatus = ELoadStatus.LOADED
                this._loadStatus[targetSrc].value = ELoadStatus.LOADED
                cb.onLoadSuccess(e)
              }
              audio.onerror = (e, t) => {
                // this._common.activeAudioStatus = ELoadStatus.ERRORED
                this._loadStatus[targetSrc].value = ELoadStatus.ERRORED
                cb.onLoadError(e, t)
              }
            }
            audio.onended = (ev) => {
              this._common.isAudioActive = false
              this._common.activeAudioSrc = null
            }
            audio.load()
          }
          this._activeAudio = audio
          this._common.isAudioActive = true
          this._common.activeAudioSrc = targetSrc
          
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
  // NOTE: Etc. 3/3
}

// NOTE: Valtio Instance (external proxy based multistore)
export const vi = Singleton.getInstance()

// NOTE: Also u can mutate vi.state if necessary
// For example: vi.state.imei.result.state = 'success'
