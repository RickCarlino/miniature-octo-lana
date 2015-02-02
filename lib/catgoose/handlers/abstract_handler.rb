require 'json'
module Catgoose
  class AbstractHandler
    attr_reader :socket, :controller
    attr_accessor :args

    def initialize(ws, args)
      @socket, @args = ws, args
    end

    def self.build(ws, args)
      instance = self.new(ws, args)
      instance.run
      instance
    end

    def run
      outcome.success? ? success : failure
    rescue JSON::ParserError
      message = JSON.generate success: false, errors: {json: 'isnt JSON'}
      socket.send_text(message)
    end

  private

    def success
      message = {success: true, data: outcome.result}.to_json
      socket.send_text message
    end

    def failure
      message = {success: false, errors: outcome.errors.message}.to_json
      socket.send_text message
    end

    def json
      json ||= JSON.parse(args)
    end

    def controller
      @controller ||= Catgoose.routes[json['action']]
    end

    def outcome
      input = json.merge(session: Catgoose.sessions[socket.object_id])
      @outcome ||= controller.run(input)
    end
  end
end
