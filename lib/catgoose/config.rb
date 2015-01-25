module Catgoose
  class Config
    DEFAULTS = {port: 8080, env: :development}
    DEFAULTS.keys.each { |setting| attr_accessor setting }

    def initialize
      reset
    end

    def reset
      DEFAULTS.each do |k, v|
        self.send("#{k}=", v)
      end
    end
  end
end
