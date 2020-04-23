import * as path from '../services/paths'
export default function () {
  var _clients = []
  this.clients = _clients
  this.socket = null
  this.creatClient = (token) => {
    if (!window.WebSocket) {
      window.WebSocket = window.MozWebSocke
    }
    if (window.WebSocket) {
      // this.socket = new WebSocket('ws://192.168.2.240:8089/' + token)
      this.socket = new WebSocket(path['WSSOCKETURL'] + token)
      this.socket.onopen = function (event) {
        console.log('连接开启!')
      }
      this.socket.onmessage = function (event) {
        // console.log('_clients', event.data)
        let data = JSON.parse(event.data)
        _clients.forEach(item => {
          if (typeof (item.onmessage) === 'function') {
            item.onmessage(data)
          }
        })
      }
      this.socket.onclose = function (e) {
        console.log('连接关闭!')
      }
    }
  }
}
