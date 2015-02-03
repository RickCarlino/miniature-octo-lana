require 'mutations'
require 'em-websocket'

require_relative 'catgoose/exceptions'
require_relative 'catgoose/config'
require_relative 'catgoose/hook'
require_relative 'catgoose/session'
require_relative 'catgoose/channel'

require_relative 'catgoose/controllers/not_found_controller'

require_relative 'catgoose/handlers/abstract_handler'
require_relative 'catgoose/handlers/close_handler'
require_relative 'catgoose/handlers/error_handler'
require_relative 'catgoose/handlers/message_handler'
require_relative 'catgoose/handlers/open_handler'

require_relative 'catgoose/controller'

require_relative 'catgoose/route_mapping'
require_relative 'catgoose/router'

module Catgoose
  class << self
    def fly
      EM.run do
        puts "Catgoose is majestically flying on port #{config.port}"
        EM::WebSocket.run(host: "0.0.0.0", port: config.port) do |ws|
            ws.onopen    do |args|
              sessions[ws.object_id] ||= Session.new ws
              callbacks[:on_open].fire(ws, args)
              OpenHandler.build(ws, args)
            end

            ws.onclose do |args|
              callbacks[:on_close].fire(ws, args)
              sessions.delete(ws.object_id)
              CloseHandler.build(ws, args)
            end

            ws.onerror   { |args| ErrorHandler.build(ws, args) }

            ws.onmessage do |args|
              callbacks[:before_message].fire(ws, args)
              MessageHandler.build(ws, args)
              callbacks[:after_message].fire(ws, args)
            end
        end
      end
    end

    def routes
      @routes ||= Router.new
    end

    def draw(&blk)
      # TODO use delegate.
      routes.draw(&blk)
    end

    def config
      @config ||= Config.new
      yield(@config) if block_given?
      @config
    end

    def sessions
      @sessions ||= {}
    end

    def before_message(&blk)
      add_cb(:before_message, &blk)
    end

    def after_message(&blk)
      add_cb(:after_message, blk)
    end

    def on_open(&blk)
      add_cb(:on_open, blk)
    end

    def on_close(&blk)
      add_cb(:on_close, blk)
    end

    def add_cb(name, &blk)
      callbacks[name].push(&blk)
    end

    def callbacks
      @callbacks ||= Hash.new { |hash, key| hash[key] = Hook.new }
    end

    def channel
      # TODO possible DDoS target by filling memory?
      @channels ||= Hash.new { |hash, key| hash[key] = Channel.new }
    end
  end
end
