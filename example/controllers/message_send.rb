class MessageSend < Catgoose::Controller
  required do
    string :message
    string :room
  end

  def validate
    add_error :channel, :none, "Cant find that channel" unless chan
  end

  def execute
    msg = {message: message, from: session[:username]}
    chan.publish msg
    {}
  end

  def chan
    @chan ||= Catgoose.channels[room.to_sym]
  end
end
