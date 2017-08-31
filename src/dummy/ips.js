const rand = () => Math.floor(Math.random() * 256)
module.exports = () => [...Array(4)].map(rand).join('.')
