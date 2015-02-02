chat = {}
chat.socket = new WebSocket('ws://localhost:8080/')

chat.log = (msg) ->
  $('#output').prepend(msg)

chat.socket.onopen = (msg) ->
  chat.log "CNECT: #{msg}"

chat.socket.onmessage = (msg) ->
  chat.log "MESSG: #{msg}"

chat.socket.onclose = (msg) ->
  chat.log "CLOSE: #{msg}"

chat.quit = ->
  chat.socket.close()

chat.send = (data) ->
  chat.send = (msg) ->
  msg = eval msg
  chat.socket.send JSON.stringify(msg)
  chat.log "SENT: #{msg}"
