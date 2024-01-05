import { Button } from '@/components/ui/button'
import { GitHubLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'

type Props = {}

const Footer = ({}: Props) => {
  return (
    <footer>
      <div className={`flex justify-center mt-16`}>
        <Button
          asChild
          size={'icon'}
          variant={'link'}
          className={`opacity-80 hover:opacity-100 focus:opacity-100 mr-1`}
        >
          <a
            href="https://github.com/kyh196201"
            target="_blank"
          >
            <GitHubLogoIcon className={`w-6 h-6`} />
            <span className={`sr-only`}>visit kyh196201 github</span>
          </a>
        </Button>

        <Button
          asChild
          size={'icon'}
          variant={'link'}
          className={`opacity-80 hover:opacity-100 focus:opacity-100`}
        >
          <a href="mailto:kyh196201@gmail.com">
            <span className={`sr-only`}>send email to kyh196201@gmail.com</span>
            <EnvelopeClosedIcon className={`w-6 h-6`} />
          </a>
        </Button>
      </div>

      <p className={`mt-2 text-center text-base`}>Copyright &copy; 2024 Seungwoo Kim</p>
    </footer>
  )
}

export default Footer
