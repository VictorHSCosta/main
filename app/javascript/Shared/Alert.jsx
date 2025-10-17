import React, { useState, useEffect } from 'react'

export default function Alert({
  type = 'info',
  message,
  onClose,
  dismissible = true,
  autoDismiss = false,
  dismissAfter = 5000,
  className = ''
}) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (autoDismiss && visible) {
      const timer = setTimeout(() => {
        handleClose()
      }, dismissAfter)

      return () => clearTimeout(timer)
    }
  }, [autoDismiss, visible, dismissAfter])

  const handleClose = () => {
    setVisible(false)
    if (onClose) {
      onClose()
    }
  }

  if (!visible || !message) return null

  const typeStyles = {
    success: {
      container: 'bg-green-50 border-green-400',
      icon: 'text-green-400',
      text: 'text-green-800',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    error: {
      container: 'bg-red-50 border-red-400',
      icon: 'text-red-400',
      text: 'text-red-800',
      iconPath: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-400',
      icon: 'text-yellow-400',
      text: 'text-yellow-800',
      iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    },
    info: {
      container: 'bg-blue-50 border-blue-400',
      icon: 'text-blue-400',
      text: 'text-blue-800',
      iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  }

  const styles = typeStyles[type] || typeStyles.info

  return (
    <div
      className={`border-l-4 p-4 ${styles.container} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className={`h-5 w-5 ${styles.icon}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={styles.iconPath}
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm ${styles.text}`}>{message}</p>
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={handleClose}
                className={`inline-flex rounded-md p-1.5 ${styles.text} hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-opacity-50`}
                aria-label="Dismiss alert"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
