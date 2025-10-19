import en from '@/dictionary/en.json'
import pt from '@/dictionary/pt.json'

export const getDictionary = (lang: string) => {
  if (lang === 'pt') {
    return pt
  }
  return en
}