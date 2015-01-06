require 'ostruct'

module CatGoose
  class Config
    DEFAULTS = {port: 8080, env: 'development'}
    DEFAULTS.keys.each { |setting| attr_accessor setting }

    def initialize
      DEFAULTS.each { |k, v| self.send("#{k}=", v) }
    end
  end
end
