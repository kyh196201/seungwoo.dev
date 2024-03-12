import CopyButton from './copy-button'

interface Props extends React.HTMLAttributes<HTMLPreElement> {
  /** code block에 입력한 텍스트 */
  raw?: string
  'data-theme'?: 'light' | 'dark'
}

function Pre({ children, raw, ...props }: Props) {
  const theme = props['data-theme'] ?? 'light'
  const code = raw ?? ''
  return (
    <div
      className="pre-wrapper relative"
      data-theme={theme}
    >
      <pre {...props}>{children}</pre>
      <CopyButton code={code} />
    </div>
  )
}

export default Pre
