import { Button } from '@/components/ui/button'
import { GitHubLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { CONFIG } from 'site.config'

type Props = {}

const year = new Date().getFullYear()
const from = CONFIG.since
const copyrightYearRange = from === year || !from ? year : `${from} - ${year}`
const { github, email, name: profileName } = CONFIG.profile

const Footer = ({}: Props) => {
  return (
    <footer className={`mt-12`}>
      <p className={`text-sm text-center xs:text-base`}>
        Copyright &copy; {copyrightYearRange} {profileName}
      </p>

      <div className={`flex justify-center xs:mt-2`}>
        <Button
          asChild
          size={'icon'}
          variant={'link'}
          className={`opacity-80 hover:opacity-100 focus:opacity-100 mr-1`}
        >
          <a
            href={`https://github.com/${github}`}
            target="_blank"
          >
            <GitHubLogoIcon className={`w-5 h-5 xs:w-6 xs:h-6`} />
            <span className={`sr-only`}>visit {github} github</span>
          </a>
        </Button>

        <Button
          asChild
          size={'icon'}
          variant={'link'}
          className={`opacity-80 hover:opacity-100 focus:opacity-100`}
        >
          <a href={`mailto:${email}`}>
            <span className={`sr-only`}>send email to {email}</span>
            <EnvelopeClosedIcon className={`w-5 h-5 xs:w-6 xs:h-6`} />
          </a>
        </Button>
      </div>
    </footer>
  )
}

export default Footer
