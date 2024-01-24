export const splitFilename = (filename: string) => {
  const index = filename.lastIndexOf('.')
  return {
    name: filename.substring(0, index),
    extension: filename.substring(index),
  }
}
