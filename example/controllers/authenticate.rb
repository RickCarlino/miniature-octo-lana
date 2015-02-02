class Authenticate < Catgoose::Controller
  required do
    string :username
  end

  def validate
  end

  def execute
    session[:username] = username
    {username: session[:username]}
  end
end
