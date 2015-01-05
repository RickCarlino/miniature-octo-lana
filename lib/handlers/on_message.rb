require 'json'

class OnMessage < AbstractHandler
  def execute
    outcome.success? ? success : failure
  rescue JSON::ParserError
    socket.send_text(JSON.generate({errors: {json: 'isnt JSON'}}))
  end

  def success
    socket.send_text outcome.result.to_json
  end

  def failure
    socket.send_text outcome.errors.message_list.to_json
  end

private

  def json
    json ||= JSON.parse(args).merge(socket: socket)
  end

  def controller
    @controller ||= ROUTES[json[:action]]
  end

  def outcome
    @outcome ||= controller.run(json)
  end
end
