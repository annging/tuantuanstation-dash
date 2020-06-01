import defaultSettings from '@/settings'

const title = defaultSettings.title || '团团站管理中心'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
