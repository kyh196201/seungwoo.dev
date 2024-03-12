import { GitHubLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { CONFIG } from 'site.config'
import { Button } from '@/components/ui/button'

const year = new Date().getFullYear()
const from = CONFIG.since
const copyrightYearRange = from === year || !from ? year : `${from} - ${year}`
const { github, email, name: profileName } = CONFIG.profile

function Footer() {
  return (
    <footer className="mt-12">
      <p className="text-center text-sm xs:text-base">
        Copyright &copy; {copyrightYearRange} {profileName}
      </p>

      <div className="flex justify-center xs:mt-2">
        <Button
          asChild
          size="icon"
          variant="link"
          className="mr-1 opacity-80 hover:opacity-100 focus:opacity-100"
        >
          <a
            href={`https://github.com/${github}`}
            target="_blank"
          >
            <GitHubLogoIcon className="h-5 w-5 xs:h-6 xs:w-6" />
            <span className="sr-only">visit {github} github</span>
          </a>
        </Button>

        <Button
          asChild
          size="icon"
          variant="link"
          className="opacity-80 hover:opacity-100 focus:opacity-100"
        >
          <a href={`mailto:${email}`}>
            <span className="sr-only">send email to {email}</span>
            <EnvelopeClosedIcon className="h-5 w-5 xs:h-6 xs:w-6" />
          </a>
        </Button>
      </div>
    </footer>
  )
}

export default Footer
