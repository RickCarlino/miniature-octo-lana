class AbstractHandler
  attr_reader :socket, :controller
  attr_accessor :args

  def run(ws, args)
    @socket, @args = ws, args
    execute
  end

  def execute
    raise 'Not implemented'
  end
end
