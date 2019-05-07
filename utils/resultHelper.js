export function processResult(data) {
    let result = []
    Object.keys(data).forEach(index => {
      let content = ''
      let children = data[index].children
      Object.keys(children).forEach(index => {
        content += `${children[index]['name']}：${children[index][
          'children'
        ].join('，')}；`
      })
      data[index].children = content
      result.push(data[index])
    })
    return result
  }
