import { useEffect, useRef, useState } from 'react'
import type { ContactContent } from '../content'

type CopyStatus = 'idle' | 'copied' | 'failed'

/** How long the "Copied" label and status message stay before resetting. */
const RESET_MS = 2600

interface CopyEmailButtonProps {
  email: string
  labels: ContactContent['copyButton']
  messages: ContactContent['copyStatus']
}

/**
 * Copies the email with the Clipboard API. Success changes the label to
 * "Copied"; failure (no clipboard access, insecure context, denied
 * permission) keeps the label and says so honestly. Either way the message is
 * announced through a polite live region, then everything resets.
 */
export function CopyEmailButton({ email, labels, messages }: CopyEmailButtonProps) {
  const [status, setStatus] = useState<CopyStatus>('idle')
  const resetTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      window.clearTimeout(resetTimer.current)
    }
  }, [])

  async function copy() {
    let next: CopyStatus
    try {
      // Throws (and lands in catch) when navigator.clipboard is unavailable.
      await navigator.clipboard.writeText(email)
      next = 'copied'
    } catch {
      next = 'failed'
    }

    setStatus(next)
    window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(() => {
      setStatus('idle')
    }, RESET_MS)
  }

  const message =
    status === 'copied' ? messages.success : status === 'failed' ? messages.failure : ''

  return (
    <>
      <button
        type="button"
        onClick={() => {
          void copy()
        }}
        className="inline-grid h-12 w-full cursor-pointer place-items-center rounded-full border border-muted px-6.5 text-nav leading-none font-medium tracking-[0.01em] transition-colors hover:border-accent-text hover:text-accent-text lg:w-auto"
      >
        {/*
          Both labels share one grid cell so the button keeps the wider one's
          width and the status beside it doesn't shift. The hidden label is
          visibility: hidden, so it's left out of the accessible name.
        */}
        <span className={`col-start-1 row-start-1 ${status === 'copied' ? 'invisible' : ''}`}>
          {labels.idle}
        </span>
        <span className={`col-start-1 row-start-1 ${status === 'copied' ? '' : 'invisible'}`}>
          {labels.success}
        </span>
      </button>
      {/* Always rendered (empty when idle) so screen readers track it before it changes. */}
      <p aria-live="polite" aria-atomic="true" className="min-h-lh text-meta text-muted">
        {message}
      </p>
    </>
  )
}
