require 'simplecov'
SimpleCov.start do
  add_filter "/spec/"
  add_filter "/example/"
end

require 'pry'
require 'catgoose'
