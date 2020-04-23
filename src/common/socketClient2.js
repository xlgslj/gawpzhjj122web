let socket
var init = function (sendFun) {
  if (!window.WebSocket) {
    window.WebSocket = window.MozWebSocke
  }
  if (window.WebSocket) {
    socket = new WebSocket('ws://192.168.2.240:8089')
    socket.onmessage = function (event) {
      sendFun(event.data)
    }
    socket.onopen = function (event) {
      console.log('连接开启!')
    }
    socket.onclose = function (event) {
      console.log('连接关闭!')
    }
  } else {
    alert('你的浏览器不支持 WebSocket！')
  }
}

var sendmsg = function (msg) {
  if (!window.WebSocket) {
    window.WebSocket = window.MozWebSocke
  }
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(msg)
  } else {
    alert('连接没有开启')
  }
}

exports.init = init
exports.send = sendmsg
