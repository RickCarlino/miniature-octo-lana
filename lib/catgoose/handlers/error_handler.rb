class ErrorHandler < Catgoose::AbstractHandler
  def run
    puts "#{args.class.to_s}: #{args.message}"
    puts args.backtrace
  end
end
