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
