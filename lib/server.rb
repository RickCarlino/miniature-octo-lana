require 'mutations'
require 'em-websocket'
require 'pry'
require_relative 'handlers/abstract_handler'

Dir["lib/handlers/**/on_*.rb"].map { |handler| load handler }
Dir["lib/controllers/**/*.rb"].map { |cntrler| load cntrler }

require_relative 'routes'

EM.run do

  port = 8080
  puts "Running on port #{port}"

  EM::WebSocket.run(host: "0.0.0.0", port: port) do |ws|
    ws.onopen    { |args| OnOpen.new.run(ws, args) }
    ws.onmessage { |args| OnMessage.new.run(ws, args) }
    ws.onerror   { |args| OnError.new.run(ws, args) }
    ws.onclose   { |args| OnClose.new.run(ws, args) }
  end
end
