module Catgoose
  class NotFoundController < Mutations::Command
    def execute
      # TODO Spit back out all of the possible controllers, including inputs and
      # names.
      add_error :action, :unknown, "We could not find an action with that name."
    end
  end
end
