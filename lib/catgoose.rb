require 'mutations'
require 'em-websocket'
require 'pry'
require_relative 'handlers/abstract_handler'

Dir["lib/handlers/**/on_*.rb"].map { |handler| load handler }
Dir["lib/controllers/**/*.rb"].map { |cntrler| load cntrler }

require_relative 'routes'
module Catgoose
  class << self
    def fly
      EM.run do
        EM::WebSocket.run(host: "0.0.0.0", port: port) do |ws|
            ws.onopen    { |args| OnOpen.new.run(ws, args) }
            ws.onmessage { |args| OnMessage.new.run(ws, args) }
            ws.onerror   { |args| OnError.new.run(ws, args) }
            ws.onclose   { |args| OnClose.new.run(ws, args) }
        end
      end
    end

    def routes
      @routes ||= Router.new
    end

    def config
      @config ||= Config.new
      yield(@config) if block_given?
      @config
    end
  end
end
