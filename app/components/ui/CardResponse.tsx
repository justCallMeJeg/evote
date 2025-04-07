import React from 'react'
import { ErrorIcon, SuccessIcon, WarningIcon } from '../icons'

const CardResponse = (
    message: string,
    type: 'success' | 'error' | 'warning'
) => {
  return (
    <div role="alert" className={`alert alert-${type}`}>
        <>
        { type === 'success' ? (
            <SuccessIcon/>
        ): type === 'warning' ? (
            <WarningIcon/>
        ) : (
            <ErrorIcon/>
        )}
        </>
        <span>{message}</span>
    </div>
  )
}

export default CardResponse