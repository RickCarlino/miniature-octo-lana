module Catgoose
  class Controller < Mutations::Command
    def session
      raw_inputs["session"]
    end
  end
end
