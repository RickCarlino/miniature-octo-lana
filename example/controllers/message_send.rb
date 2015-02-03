class MessageSend < Catgoose::Controller
  required do
    string :message
    string :room
  end

  def execute
    msg = {message: message, from: session[:username]}
    Catgoose.channels[name.to_sym].publish msg
  end
end
