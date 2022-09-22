export default function textToPath(text: string) {
  return text.toLocaleLowerCase().replaceAll(' ', '-')
}