const CONFIG = {
  siteUrl: 'https://seungwoo.dev',
  since: 2024, // null
  profile: {
    name: 'Seungwoo Kim',
    github: 'https://github.com/kyh196201',
    email: 'kyh196201@gmail.com',
    repo: 'https://github.com/kyh196201/seungwoo.dev',
  },
  blog: {
    title: 'seungwoo.dev',
    description: '승우의 개발 블로그, seungwoo.dev',
  },
  googleSearchConsole: {
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    },
  },
  giscus: {
    repo: 'kyh196201/seungwoo.dev',
    repoId: 'R_kgDOK6uDng',
    category: 'Announcements',
    categoryId: 'DIC_kwDOK6uDns4CeNzZ',
  },
}

module.exports = { CONFIG }
