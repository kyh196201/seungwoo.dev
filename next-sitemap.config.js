const { CONFIG } = require('./site.config')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: CONFIG.siteUrl,
  generateRobotsTxt: true,
}
