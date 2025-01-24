import React from 'react'
import { Alert, ResponsiveBlock } from '~/common/components'

export class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      uiMsg: null,
    };
  }

  static getDerivedStateFromError(error: any) {
    // NOTE: Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error,
      uiMsg: error.message || 'No error.message',
      details: error.stack,
    }
  }
  componentDidCatch(_error: any, _errorInfo: any) {
    // console.log(_error)
    // console.log(_errorInfo)
    // NOTE: You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }
  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // NOTE: You can render any custom fallback UI
      return (
        <ResponsiveBlock
          isPaddedMobile
          isLimitedForDesktop
        >
          <Alert
            type='danger'
            header='Произошла ошибка приложения'
          >
            {/* @ts-ignore */}
            {!!this.state.uiMsg && <div>{this.state.uiMsg}</div>}
            {/* @ts-ignore */}
            {/* <pre className={clsx('text-sm', baseClasses.preStyled)}>{JSON.stringify({ error: this.state.details }, null, 2)}</pre> */}
            {/* @ts-ignore */}
            {!!this.state.uiMsg && <div>{this.state.details}</div>}
          </Alert>
        </ResponsiveBlock>
      )
    }
    // @ts-ignore
    return this.props.children
  }
}
