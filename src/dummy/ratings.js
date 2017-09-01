const ratings = [...Array(3)].map((_, i) => i)
module.exports = () => ratings[Math.floor(Math.random() * ratings.length)]
