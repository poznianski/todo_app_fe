import React from 'react'
import classNames from 'classnames'

type Props = {
  hasError: boolean
  onClose: () => void
  children: string
}

export const Error: React.FC<Props> = React.memo(
  ({ hasError, onClose, children }) => (
    <div
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        {
          hidden: !hasError,
        }
      )}
    >
      <button
        type="button"
        className="delete"
        aria-label="Error button"
        onClick={onClose}
      />

      {children}
    </div>
  )
)
