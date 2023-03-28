let http = require('http')
let _listener = require('./_listener')
let _services = require('./_services')
let _livereload = require('./_livereload')
let destroyer = require('server-destroy')

// Global ref for .end
let _arcServices

/**
 * Internal Architect services, including:
 * - SSM-based service discovery mock
 * - API Gateway v2 Management API
 */
function start (params, callback) {
  let { ports, host, restart, update } = params

  _services(params, function (err, services) {
    if (err) callback(err)
    else {
      let listener = _listener.bind({}, services, params)
      _arcServices = http.createServer(listener)
      arc.livereload = _livereload(_arcServices, params)
      // Node.js 17+ changed DNS lookup behavior for host binding; prefer host to be undefined unless manually specified
      _arcServices.listen(ports._arc, host, err => {
        if (err) callback(err)
        else {
          if (!restart) update.verbose.done('Started AWS service emulator')
          destroyer(_arcServices)
          callback()
        }
      })
    }
  })
}

function end (callback) {
  if (_arcServices) _arcServices.destroy(callback)
  else callback()
}

let arc = { start, end }
module.exports = arc
