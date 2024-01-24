export const splitFilename = (filename: string) => {
  const index = filename.lastIndexOf('.')
  if (index === -1) {
    return {
      name: filename,
      extension: '',
    }
  }
  return {
    name: filename.substring(0, index),
    extension: filename.substring(index),
  }
}

export const splitFilenameWithRandomSuffix = (filename: string) => {
  const { name, extension } = splitFilename(filename)
  const uniqueSuffix = Math.round(Math.random() * 1e4)
    .toString()
    .padStart(4, '0')
  return {
    name: `${name}-${uniqueSuffix}`,
    extension,
  }
}
