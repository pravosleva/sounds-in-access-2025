/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState, memo } from 'react'
import clsx from 'clsx'
import baseClasses from '~/App.module.scss'
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
// import { FaPlus, FaMinus } from 'react-icons/fa6'
import classes from './CollapsibleBox.module.scss'
import { Minus, Plus } from '~/common/components/icons';


type TProps = {
  children: React.ReactNode;
  title: string;
  level?: 1 | 2 | 3 | 4;
  StartIcon?: React.ReactNode;
};

export const CollapsibleBox = memo(({ title, children, level, StartIcon }: TProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const toggler = useCallback(() => {
    setIsOpened((s) => !s);
  }, [setIsOpened])

  return (
    <>
      <button
        className={clsx(
          classes.toggler,
          {
            [classes[`toggler_level_${level}`]]: !!level,
          },
          baseClasses.truncate,
        )}
        onClick={toggler}
      >
        <span>{isOpened ? <Minus size={{ w: 16, h: 16 }} /> : <Plus size={{ w: 16, h: 16 }} />}</span>
        {!!StartIcon && <span>{StartIcon}</span>}
        <span className={baseClasses.truncate}>{title}</span>
      </button>
      {isOpened && <div>{children}</div>}
    </>
  )
})
