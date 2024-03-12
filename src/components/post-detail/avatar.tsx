import Image from 'next/image'

// TODO: size props
function Avatar() {
  return (
    <div className="h-8 w-8">
      <Image
        src="/images/avatar.svg"
        alt="avatar image"
        width={32}
        height={32}
        className="block w-full"
      />
    </div>
  )
}

export default Avatar
