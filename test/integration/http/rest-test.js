let { join } = require('path')
let { existsSync } = require('fs')
let tiny = require('tiny-json-http')
let test = require('tape')
let sut = join(process.cwd(), 'src')
let sandbox = require(sut)
let { b64dec, url, data, startupNew: startup, shutdownNew: shutdown, checkRestResult: checkResult, rmPublic, teardown } = require('./_utils')

test('Set up env', t => {
  t.plan(1)
  t.ok(sandbox, 'Got sandbox')
})

test('Module', t => {
  runTests('module')
  t.end()
})

test('Binary', t => {
  let bin = join(process.cwd(), 'bin', 'sandbox-binary')
  if (existsSync(bin)) {
    runTests('binary')
    t.end()
  }
  else t.end()
})

function runTests (runType) {
  test(`[REST mode] Start Sandbox (${runType})`, t => {
    process.env.ARC_API_TYPE = 'rest'
    startup[runType](t, 'normal')
  })

  test('[REST mode] get /', t => {
    t.plan(16)
    tiny.get({
      url
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get / running the default runtime',
          resource: '/',
          path: '/',
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test('[REST mode] get /?whats=up', t => {
    t.plan(16)
    tiny.get({
      url: url + '/?whats=up'
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get / running the default runtime',
          resource: '/',
          path: '/',
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: { whats: 'up' },
          multiValueQueryStringParameters: { whats: [ 'up' ] },
          pathParameters: null,
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test('[REST mode] get /?whats=up&whats=there', t => {
    t.plan(16)
    tiny.get({
      url: url + '/?whats=up&whats=there'
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get / running the default runtime',
          resource: '/',
          path: '/',
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: { whats: 'there' },
          multiValueQueryStringParameters: { whats: [ 'up', 'there' ] },
          pathParameters: null,
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test('[REST mode] get /binary', t => {
    t.plan(17)
    let path = '/binary'
    tiny.get({
      url: url + path
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, JSON.parse(result.headers.body), {
          message: 'Hello from get /binary',
          resource: path,
          path,
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          body: null,
          isBase64Encoded: false,
        })
        const img = Buffer.from(result.body).toString('base64')
        t.match(img, /AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAA/, 'is binary')
      }
    })
  })

  test('[REST mode] get /nodejs12.x', t => {
    t.plan(16)
    let path = '/nodejs12.x'
    tiny.get({
      url: url + path
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get /nodejs12.x (running nodejs12.x)',
          resource: path,
          path,
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test('[REST mode] get /nodejs10.x', t => {
    t.plan(16)
    let path = '/nodejs10.x'
    tiny.get({
      url: url + path
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get /nodejs10.x (running nodejs10.x)',
          resource: path,
          path,
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test('[REST mode] get /nodejs8.10', t => {
    t.plan(16)
    let path = '/nodejs8.10'
    tiny.get({
      url: url + path
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get /nodejs8.10 (running nodejs8.10)',
          resource: path,
          path,
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test('[REST mode] get /python3.8', t => {
    t.plan(16)
    let path = '/python3.8'
    tiny.get({
      url: url + path
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get /python3.8 (running python3.8)',
          resource: path,
          path,
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test('[REST mode] get /python3.7', t => {
    t.plan(16)
    let path = '/python3.7'
    tiny.get({
      url: url + path
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get /python3.7 (running python3.7)',
          resource: path,
          path,
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test('[REST mode] get /python3.6', t => {
    t.plan(16)
    let path = '/python3.6'
    tiny.get({
      url: url + path
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get /python3.6 (running python3.6)',
          resource: path,
          path,
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test('[REST mode] get /ruby2.5', t => {
    t.plan(16)
    let path = '/ruby2.5'
    tiny.get({
      url: url + path
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get /ruby2.5 (running ruby2.5)',
          resource: path,
          path,
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test('[REST mode] get /deno', t => {
    t.plan(16)
    let path = '/deno'
    tiny.get({
      url: url + path
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get /deno (running deno)',
          resource: path,
          path,
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test('[REST mode] get /no-return (noop)', t => {
    t.plan(2)
    tiny.get({
      url: url + '/no-return'
    }, function _got (err, result) {
      if (err) {
        let message = 'Async error'
        t.equal(err.statusCode, 500, 'Errors with 500')
        t.match(err.body, new RegExp(message), `Errors with message: '${message}'`)
      }
      else t.fail(result)
    })
  })

  test('[REST mode] post /post', t => {
    t.plan(16)
    let path = '/post'
    tiny.post({
      url: url + path,
      data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from post /post',
          resource: path,
          path,
          httpMethod: 'POST',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          // body: true,
          isBase64Encoded: true,
        })
        t.equal(b64dec(result.body.body), 'hi=there', 'Got base64-encoded form URL-encoded body payload')
      }
    })
  })

  test('[REST mode] put /put', t => {
    t.plan(16)
    let path = '/put'
    tiny.put({
      url: url + path,
      data,
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from put /put',
          resource: path,
          path,
          httpMethod: 'PUT',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          body: true,
          isBase64Encoded: true,
        })
      }
    })
  })

  test('[REST mode] patch /patch', t => {
    t.plan(16)
    let path = '/patch'
    tiny.patch({
      url: url + path,
      data,
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from patch /patch',
          resource: path,
          path,
          httpMethod: 'PATCH',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          body: true,
          isBase64Encoded: true,
        })
      }
    })
  })

  test('[REST mode] delete /delete', t => {
    t.plan(16)
    let path = '/delete'
    tiny.del({
      url: url + path,
      data,
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from delete /delete',
          resource: path,
          path,
          httpMethod: 'DELETE',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: null,
          body: true,
          isBase64Encoded: true,
        })
      }
    })
  })

  /**
   * Arc v6: greedy root (`any /{proxy+}`) fallthrough
   */
  test('[REST mode] post / - route should fail when not explicitly defined, but only because `any /{proxy+}` does not cover requests to root', t => {
    t.plan(2)
    tiny.post({
      url,
      data,
    }, function _got (err, result) {
      if (err) {
        let message = '@http post /'
        t.equal(err.statusCode, 403, 'Errors with 403')
        t.match(err.body, new RegExp(message), `Errors with message instructing to add '${message}' handler`)
      }
      else t.fail(result)
    })
  })

  test('[REST mode] get /foobar – route should fall through to greedy root', t => {
    t.plan(16)
    let path = '/foobar'
    tiny.get({
      url: url + path,
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get / running the default runtime',
          resource: '/{proxy+}',
          path,
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: { proxy: 'foobar' },
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test('[REST mode] get /path/* – route should fall through to greedy root because catchalls are not supported in this mode', t => {
    t.plan(16)
    let path = '/path/hello/there'
    tiny.get({
      url: url + path
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get / running the default runtime',
          resource: '/{proxy+}',
          path,
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: { proxy: 'path/hello/there' },
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test(`[REST mode] get /any – route should fall through to greedy root because 'any' is not supported in this mode`, t => {
    t.plan(16)
    let path = '/any'
    tiny.get({
      url: url + path
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        checkResult(t, result.body, {
          message: 'Hello from get / running the default runtime',
          resource: '/{proxy+}',
          path,
          httpMethod: 'GET',
          headers: '🤷🏽‍♀️',
          multiValueHeaders: '🤷🏽‍♀️',
          queryStringParameters: null,
          multiValueQueryStringParameters: null,
          pathParameters: { proxy: 'any' },
          body: null,
          isBase64Encoded: false,
        })
      }
    })
  })

  test(`[REST mode] Shut down Sandbox (${runType})`, t => {
    shutdown[runType](t)
  })

  /**
   * Arc v6: test failing to load index.html without get / defined
   */
  test(`[REST mode] Start Sandbox (${runType})`, t => {
    startup[runType](t, 'no-index-fail')
  })

  test('[REST mode] get / without defining get / should fail if index.html not present', t => {
    t.plan(2)
    rmPublic(t)
    tiny.get({
      url
    }, function _got (err, result) {
      if (err) t.equal(err.statusCode, 404, 'Got 404 for missing file')
      else t.fail(result)
    })
  })

  test(`[REST mode] Shut down Sandbox (${runType})`, t => {
    shutdown[runType](t)
  })

  /**
   * Arc v6: test successfully loading index.html without get / defined
   */
  test(`[REST mode] Start Sandbox (${runType})`, t => {
    startup[runType](t, 'no-index-pass')
  })

  test('[REST mode] get / without defining get / should succeed if index.html is present', t => {
    t.plan(2)
    tiny.get({
      url
    }, function _got (err, result) {
      if (err) t.fail(err)
      else {
        t.ok(result, 'got /')
        let { body } = result
        t.equal(body, 'Hello world!')
      }
    })
  })

  test(`[REST mode] Shut down Sandbox (${runType})`, t => {
    shutdown[runType](t)
  })

  /**
   * Arc v6: test failing to load an endpoint missing its local handler file
   */
  test(`[REST mode] Start Sandbox (${runType})`, t => {
    startup[runType](t, 'missing-handler')
  })

  test('[REST mode] get /missing should fail if missing its handler file', t => {
    t.plan(2)
    tiny.get({
      url: url + '/missing'
    }, function _got (err, result) {
      if (err) {
        t.equal(err.statusCode, 502, 'Got 502 for missing file')
        t.match(err.body, /Lambda handler not found/, 'Got correct error')
      }
      else t.fail(result)
    })
  })

  test(`[REST mode] Shut down Sandbox (${runType})`, t => {
    shutdown[runType](t)
  })

  /**
   * Test to ensure sandbox loads without defining @http
   */
  test(`[REST mode] Start Sandbox (${runType})`, t => {
    startup[runType](t, 'no-http')
  })

  test('[REST mode] get / without defining @http', t => {
    t.plan(1)
    tiny.get({
      url
    }, function _got (err, result) {
      if (err) t.equal(err.code, 'ECONNREFUSED', 'Connection refused')
      else t.fail(result)
    })
  })

  test(`[REST mode] Teardown (${runType})`, t => {
    teardown[runType](t)
  })
}
