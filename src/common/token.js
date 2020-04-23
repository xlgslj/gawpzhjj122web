export function checkToken (token) {
  var decArr
  try {
    decArr = token.split('.')
  } catch (e) {
    return false
  }
  if (decArr.length < 2) {
    // token不合法
    return false
  }
  var payload = {}
  // 将payload json字符串 解析为对象
  try {
    payload = JSON.parse(Buffer.from(decArr[0], 'base64').toString('utf8'))
  } catch (e) {
    return false
  }
  // 是否过期
  console.log(parseInt(Date.now() / 1000), parseInt(payload.created), (parseInt(Date.now() / 1000) - parseInt(payload.created)), parseInt(payload.exp))
  console.log(parseInt((new Date()).getTime() / 1000))
  var expState = !((parseInt(Date.now() / 1000) - parseInt(payload.created)) > parseInt(payload.exp))
  return expState
}
