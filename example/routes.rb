Catgoose.draw do |map|
  map.route 'login' => Authenticate
  map.route 'chat'  => MessageSend
  map.route 'join'  => RoomSubscribe
end
