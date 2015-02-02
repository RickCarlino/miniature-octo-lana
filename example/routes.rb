Catgoose.draw do |map|
  map.route     'authenticate' => Authenticate
  map.route     'message.send' => MessageSend
end
