module Catgoose
  class Session
    attr_reader :socket

    def initialize(socket)
      @socket = socket
    end

    def subscribe(name)
      Catgoose.channels[name.to_sym].subscribe(self)
    end

    def unsubscribe(name)
      Catgoose.channels[name.to_sym].unsubscribe(self)
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
