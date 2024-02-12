import { CodePen as MdxCodePen } from 'mdx-embed'
import { useTheme } from 'next-themes'

interface Props {
  codePenId: string
}

const CodePen = ({ codePenId }: Props) => {
  const { systemTheme, theme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'
  const penTheme = isDark ? 'dark' : 'default'

  return (
    <div className={`my-8`}>
      <MdxCodePen
        codePenId={codePenId}
        theme={penTheme}
      />
    </div>
  )
}

export default CodePen
