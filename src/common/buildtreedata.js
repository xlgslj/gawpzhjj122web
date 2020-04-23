export function hasroot (data, id, name, pid, bmno, other) {
  let treedata = []
  let root = {
    ID: id,
    NAME: name,
    PID: pid,
    BMNO: bmno,
    children: []
  }
  Object.assign(root, other || {})
  let m1 = []
  data.forEach(item => {
    if (item.PID === root.ID) {
      m1.push(item)
    }
  })
  m1.forEach(item1 => {
    let m2 = data.filter(item2 => {
      return item1.ID === item2.PID
    })
    m2.forEach(item3 => {
      let m3 = data.filter(item4 => {
        return item4.PID === item3.ID
      })
      item3.children = m3
    })
    item1.children = m2
  })
  root.children = m1
  treedata.push(root)
  return treedata
}
