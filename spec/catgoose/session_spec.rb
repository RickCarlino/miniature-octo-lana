require 'spec_helper'

class StubSocket
end

class StubChannel
  attr_accessor :subscribers

  def initialize
    @subscribers = {}
  end

  def subscribe(obj)
    subscribers[obj.object_id] = obj
  end

  def unsubscribe(obj)
    subscribers.delete(obj)
  end
end

describe Catgoose::Session do
  it 'sets/gets objects to the `store`' do
    session = Catgoose::Session.new(StubSocket.new, {})
    session[:blah] = "Any object is OK"
    expect(session[:blah]).to eq("Any object is OK")
  end

  it 'subscribes / unsubscribes from a channel' do
    channels = {stub: StubChannel.new}
    session = Catgoose::Session.new(StubSocket.new, channels)
    session.subscribe(:stub)
    expect(channels[:stub].subscribers.count).to eq(1)
    session.unsubscribe(:stub)
    expect(channels[:stub].subscribers.count).to eq(1)
  end
end
