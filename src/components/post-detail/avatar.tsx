import Image from 'next/image'
import avatarImage from '/public/images/avatar.svg'

// TODO: size props
const Avatar = () => {
  return (
    <div className={`w-8 h-8`}>
      <Image
        src={avatarImage}
        alt="avatar"
        className={`block w-full`}
      />
    </div>
  )
}

export default Avatar
