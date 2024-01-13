const CONFIG = {
  siteUrl: 'https://seungwoo.dev',
  since: 2024, // null
  profile: {
    name: 'Seungwoo Kim',
    github: 'kyh196201',
    email: 'kyh196201@gmail.com',
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
}

module.exports = { CONFIG }
