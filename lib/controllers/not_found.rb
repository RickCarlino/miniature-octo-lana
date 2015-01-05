class NotFound < Mutations::Command
  def execute
    binding.pry
    {blah: 'opps'}
  end
end
