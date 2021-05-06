import defaultSettings from '@/settings'

const title = defaultSettings.title || '都来运'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
