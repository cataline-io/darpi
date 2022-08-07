const units = ['b', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb']

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) {
    return {
      size: 0,
      unitIndex: 0
    }
  }

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return {
    size: Math.floor(parseFloat((bytes / Math.pow(k, i)).toFixed(dm))),
    unitIndex: i
  }
}

interface Options {
  bytes: number
  reference: string
}

export const validateSize = ({ bytes, reference }: Options) => {
  const fileData = formatBytes(bytes)

  const referenceData = {
    size: parseFloat(reference),
    unitIndex: units.indexOf(reference.match(/[a-zA-Z]+/g)![0])
  }

  if (referenceData.unitIndex < 0) {
    throw new Error('invalid reference unit')
  }

  if (fileData.unitIndex > referenceData.unitIndex) {
    return false
  }

  if (fileData.unitIndex < referenceData.unitIndex) {
    return true
  }

  if (fileData.unitIndex === referenceData.unitIndex) {
    if (fileData.size <= referenceData.size) {
      return true
    }
  }

  return false
}
