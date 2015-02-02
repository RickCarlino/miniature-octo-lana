module Catgoose
  class Session
    attr_reader :socket

    def initialize(socket)
      @socket = socket
    end

    def [](key)
      hash[key.to_sym]
    end

    def []=(key, value)
      hash[key.to_sym] = value
    end

    def hash
      @hash ||= {}
    end
  end
end
