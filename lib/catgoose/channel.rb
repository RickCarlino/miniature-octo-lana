module Catgoose
  class Channel < EM::Channel
    attr_reader :name

    def initialize(name)
      @name = name.to_sym
      super()
    end

    def publish(msg)
      push msg
    end

    def subscribe(session)
      # TODO consolidate all the JSON packing and unpacking into one location.
      # There is duplicate logic in here and abstract handler. Putting that in
      # one location also opens the door to alternative serialization methods.
      sid = super() { |msg| session.socket.send_text JSON.generate(msg) }
      session[:subscriptions] ||= {}
      session[:subscriptions][name] = sid
    end

    def unsubscribe(session)
      super(session[:subscriptions][name])
    end
  end
end
