const date = () => new Date(
  2017,
  Math.floor(Math.random() * 12),
  1 + Math.floor(Math.random() * 31),
  6 + Math.floor(Math.random() * 12),
  Math.floor(Math.random() * 60))

module.exports = () => {
  const now = new Date().getTime()

  while (true) {
    const timestamp = date()
    if (timestamp.getTime() <= now) return timestamp
  }
}
