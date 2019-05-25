/**
 * https://blog.csdn.net/sinat_35515778/article/details/72677390
 */
export function MP(ak) {
  return new Promise(function(resolve, reject) {
    if (typeof BMap !== 'undefined') {
      resolve(BMap)
    }
    window.onload = function() {
      resolve(BMap)
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      'https://api.map.baidu.com/api?v=2.0&ak=' + ak + '&callback=init'
    script.onerror = reject
    document.head.appendChild(script)
  })
}
