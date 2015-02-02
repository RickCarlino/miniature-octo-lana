require 'spec_helper'

describe Catgoose::AbstractHandler do
  let(:handler) { Catgoose::AbstractHandler.new Object.new,
                                                '{"action": "test"}' }
  it 'builds a handler' do
    expect(handler).to be_kind_of(Catgoose::AbstractHandler)
  end
end
