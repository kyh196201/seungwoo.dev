import { Metadata } from 'next'
import { DEFAULT_METADATA } from '@/utils/metadata'
import PageLayout from '@/components/page-layout'
import Image from 'next/image'
import profileImage from '../../public/profile.jpg'

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
}

export default function HomePage() {
  return (
    <PageLayout>
      <div className={`flex flex-col sm:flex-row xs:pt-12 sm:pt-16`}>
        <div
          className={`overflow-hidden self-center w-40 mb-4 rounded-full shadow-xl xs:w-52 xs:mb-8 sm:mr-6 sm:self-start sm:w-64 lg:w-96 lg:mr-12`}
        >
          <Image
            src={profileImage}
            alt="Seungwoo Kim"
            placeholder="blur"
            className={`block w-full`}
          />
        </div>
        <p className={`break-keep text-sm xs:text-base`}>
          안녕하세요!
          <br />
          저는 프론트엔드 개발자 <strong>김승우</strong>입니다.
          <br />
          Javascript, React, Vue를 이용해 아이디어를 구현하는 것을 좋아합니다.
          <br />
          <br />
          가독성 좋은 코드를 작성하려고 노력하고,
          <br />
          복잡한 문제를 단순하게 나누는 것을 좋아합니다.
          <br />
          <br />
          개발을 하면서 경험한 내용, 새롭게 배운 내용을 다른 사람들과 공유하고 싶습니다.
          <br />
          부족한 점이 많기에 항상 배우려고 노력하고 있습니다.
          <br />
          피드백은 언제나 환영입니다.
          <br />
          감사합니다. 😊
        </p>
      </div>
    </PageLayout>
  )
}
