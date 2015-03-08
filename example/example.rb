require_relative '../lib/catgoose'
require_relative 'config'
require_relative 'controllers/message_send'
require_relative 'controllers/authenticate'
require_relative 'controllers/room_subscribe'
require_relative 'routes'
# require 'pry'

Catgoose.before_message do |connection, data|
  puts connection, data, 'incoming message.'
end

# TODO We should just have a channels#create(name) method
Catgoose.channels[:example] = Catgoose::Channel.new('example')

begin
  Catgoose.fly
rescue Exception => e
  `espeak "Server has crashed"`
end

# TODO:
# 1. Set username on connect
# 2. Dissalow message.send until username is set
# 3. Broadcast message to all users.
# 4. Create a new chat channel
# 5. Send to only people in that channel

