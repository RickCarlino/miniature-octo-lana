class OnError < AbstractHandler
  def execute
    puts "#{args.class.to_s} => #{args.message}"
  end
end
