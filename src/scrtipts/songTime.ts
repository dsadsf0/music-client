const songTime = (currentTime: number, duration: number) => {
  const curDiv = Math.floor(currentTime / 60)
  const curRem = Math.floor(currentTime % 60)
  const curM = curDiv < 10 ? '0' + curDiv : curDiv
  const curS = curRem < 10 ? '0' + curRem : curRem
  const durDiv = Math.floor(duration / 60)
  const durRem = Math.floor(duration % 60)
  const durM = durDiv < 10 ? '0' + durDiv : durDiv
  const durS = durRem < 10 ? '0' + durRem : durRem

  return `${curM}:${curS}/${durM}:${durS}`
}

export const curSongTime = (currentTime: number) => {
  const curDiv = Math.floor(currentTime / 60)
  const curRem = Math.floor(currentTime % 60)
  const curM = curDiv < 10 ? '0' + curDiv : curDiv
  const curS = curRem < 10 ? '0' + curRem : curRem
  return curM + ':' + curS;
}

export const durSong = (duration: number) => {
  const durDiv = Math.floor(duration / 60)
  const durRem = Math.floor(duration % 60)
  const durM = durDiv < 10 ? '0' + durDiv : durDiv
  const durS = durRem < 10 ? '0' + durRem : durRem
  return durM + ':' + durS;
}

export default songTime