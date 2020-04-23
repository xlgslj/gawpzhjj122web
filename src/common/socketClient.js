import * as path from '../services/paths'
var _clients = [123]
export default function () {
  this.clients = []
  this.socket = null
  this.creatClient = (uuid) => {
    if (!window.WebSocket) {
      window.WebSocket = window.MozWebSocke
    }
    if (window.WebSocket) {
      // this.socket = new WebSocket('ws://192.168.2.240:8089/' + token)
      this.socket = new WebSocket(path['WSSOCKETURL'] + uuid)
      this.socket.onopen = function (event) {
        console.log('连接开启!')
      }
      this.socket.onmessage = (event) =>{
        let data = JSON.parse(event.data)
        //console.log(data)
        this.clients.forEach(item => {
          if (typeof (item) === 'function') {
            item(data)
          }
        })
      }
      this.socket.onclose = function (e) {
        console.log('连接关闭!')
      }
    }
  }
}
