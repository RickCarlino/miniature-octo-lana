require 'mutations'
require 'em-websocket'

require 'catgoose/exceptions'
require 'catgoose/config'
require 'catgoose/hooks'

require 'catgoose/controllers/not_found_controller'

require 'catgoose/handlers/abstract_handler'
require 'catgoose/handlers/on_close'
require 'catgoose/handlers/on_error'
require 'catgoose/handlers/on_message'
require 'catgoose/handlers/on_open'

require 'catgoose/controller'

require 'catgoose/route_mapping'
require 'catgoose/router'

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
