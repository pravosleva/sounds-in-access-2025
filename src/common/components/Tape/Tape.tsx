import clsx from 'clsx'
import classes from './Tape.module.scss'
import { useSnapshot } from 'valtio/react'
import { vi } from '~/common/vi'

export const Tape = () => {
  const commonState = useSnapshot(vi.common)

  return (
    
    <div
      className={classes.tape}
    >
      {/* <div className={classes.progressRange}>
        <input id="progressRange" className="input" value="20" type="range" title="Progress" max="98" min="2" />  
      </div> */}
      <div className={classes.tapeScrews}>
        <div className={classes.tapeScrew}>
          <div className={classes.tapeScrewOverflow}>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={classes.tapeScrew}>
          <div className={classes.tapeScrewOverflow}>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={classes.tapeScrew}>
          <div className={classes.tapeScrewOverflow}>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={classes.tapeScrew}>
          <div className={classes.tapeScrewOverflow}>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div className={classes.tapeHeader}>A
        {/* <div className={classes.tapeTitle}>
          Back to the future
        </div> */}
      </div>
      <div className={classes.tapeBody}>
        <div className={classes.tapeWindow}>
          <div className={classes.tapeSpools}>
            <div className={classes.tapeSpool}>
              <div
                className={clsx(
                  classes.tapeSpoolbar,
                  {
                    [classes.isPlayed]: commonState.isAudioActive,
                  }
                )}
              >
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={classes.tapeFilmContainer}>
                <div className={classes.tapeFilm}></div>
              </div>
            </div>
            <div className={classes.tapeSpool}>
              <div
                className={clsx(
                  classes.tapeSpoolbar,
                  classes.tapeSpoolbar,
                  {
                    [classes.isPlayed]: commonState.isAudioActive,
                  }
                )}
              >
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className={classes.tapeFilmContainer}>
                <div className={classes.tapeFilm}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.tapeFooter}>
        <div className="tape-holes">
          <div className={clsx(classes.tapeHole, classes['tapeHole_radial'])}></div>
          <div className={clsx(classes.tapeHole, classes['tapeHole_square'])}></div>
        </div>
        <div className={classes.tapeScrew}>
          <div className={classes.tapeScrewOverflow}>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
