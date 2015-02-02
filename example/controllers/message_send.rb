class MessageSend < Catgoose::Controller
  required do
    string :message
  end

  def execute
    {message: message,
     from: session[:username]}
  end
end
