import React from 'react'
import clsx from 'clsx'
// import classes from './ResponsiveBlock.module.scss'

type TProps = {
  isLimited?: boolean;
  isPaddedMobile?: boolean;
  style?: React.CSSProperties;
  className?: string;
  hasDesktopFrame?: boolean;
  children: React.ReactNode;
  // zeroPaddingMobile?: boolean;
  isLimitedForDesktop?: boolean;
  // isLastSection?: boolean;
  hasRedBorder?: boolean;
}

// const limitForDesktop = 1000

export const ResponsiveBlock: React.FC<any> = ({
  // zeroPaddingMobile,
  children,
  // isLimited,
  isPaddedMobile,
  style,
  className,
  // hasDesktopFrame,
  isLimitedForDesktop,
  // isLastSection,
  hasRedBorder,
}: TProps) => {
  switch (true) {
    case isLimitedForDesktop:
      return (
        <div
          className={clsx(
            // 'w-full',
            // classes.base,
            // classes.isLimitedForDesktop,
            // classes.limitedWidth,
            // classes.centered,
            // {
            //   [classes.isPaddedMobile]: isPaddedMobile,
            //   [classes.redBorder]: hasRedBorder,
            // },
            
            // 'flex',
            // 'flex-col',
            
            'place-content-center',
            'max-w-screen-md',
            'max-w-screen-md',
            isPaddedMobile && 'px-4 xs:px-0',
            // isLimitedForDesktop &&
            className,
          )}
          style={{
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            ...style || {}
          }}
        >
          {children}
        </div>
      )
    // case isLimited && !isPaddedMobile && !hasDesktopFrame:
    // case isLimited && !isPaddedMobile:
    //   return (
    //     <div
    //       className={clsx(
    //         classes.base,
    //         // { [classes.isLastSection]: isLastSection },
    //         classes.limitedWidth,
    //         classes.centered,
    //       )}
    //     >
    //       {children}
    //     </div>
    //   )
    default:
      return (
        <div
          className={clsx(
            // classes.base,
            // {
            //   [classes.redBorder]: hasRedBorder,
            // },
            className,
            'flex',
            'flex-col',
            'place-content-center',
          )}
          style={style || {}}
        >
          {children}
        </div>
      )
  }
}
