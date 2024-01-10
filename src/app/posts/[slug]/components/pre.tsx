import CopyButton from './copy-button'

interface Props extends React.HTMLAttributes<HTMLPreElement> {
  /** code block에 입력한 텍스트 */
  raw?: string
}

const Pre = ({ children, raw, ...props }: Props) => {
  return (
    <div className={`relative pre-wrapper`}>
      <pre {...props}>{children}</pre>
      <CopyButton code={raw ?? ''} />
    </div>
  )
}

export default Pre
