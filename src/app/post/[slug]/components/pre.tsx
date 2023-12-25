import CopyButton from '@/app/post/[slug]/components/copy-button'

interface Props extends React.HTMLAttributes<HTMLPreElement> {
  /** code block에 입력한 텍스트 */
  raw?: string
}

const Pre = ({ children, raw, ...props }: Props) => {
  return (
    <pre
      className={`relative`}
      {...props}
    >
      {children}
      <CopyButton code={raw ?? ''} />
    </pre>
  )
}

export default Pre
