let count = 0;

function increase() {
  count++;
}
function getCount() {
  return count;
}

// 모듈화 -> getCount 함수를 새로 만들어 주소만 전송
// 모듈화로 인해 외부에서 직접 접근 가능함
module.exports.getCount = getCount;
module.exports.increase = increase;
