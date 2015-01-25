module Catgoose
  class NotFoundController < Mutations::Command
    def execute
      {blah: 'opps'}
    end
  end
end
