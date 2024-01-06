import { Button } from '@/components/ui/button'
import { GitHubLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'

type Props = {}

const Footer = ({}: Props) => {
  return (
    <footer className={`mt-12`}>
      <p className={`text-sm text-center xs:text-base`}>Copyright &copy; 2024 Seungwoo Kim</p>

      <div className={`flex justify-center xs:mt-2`}>
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
            <GitHubLogoIcon className={`w-5 h-5 xs:w-6 xs:h-6`} />
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
            <EnvelopeClosedIcon className={`w-5 h-5 xs:w-6 xs:h-6`} />
          </a>
        </Button>
      </div>
    </footer>
  )
}

export default Footer
