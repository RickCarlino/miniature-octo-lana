module CatGoose
  class NotFoundController < Mutations::Command
    def execute
      binding.pry
      {blah: 'opps'}
    end
  end
end
