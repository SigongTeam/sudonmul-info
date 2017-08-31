const locations = [
  '강원도 홍천군 내촌면 물걸리',
  '서울특별시 강동구 암사동',
  '대한민국 경기도 부천시 오정구',
  '인천광역시 남동구 서창동',
  '수원시 영통구 원천동',
  '경기도 안성시 금광면',
  '경상북도 상주시 공성면',
  '충청남도 금산군 남이면'
]

module.exports = () => locations[Math.floor(Math.random() * locations.length)]
