class RoomSubscribe < Catgoose::Controller
  required do
    string :name
  end

  def execute
    session.subscribe(name)
    {}
  end
end
