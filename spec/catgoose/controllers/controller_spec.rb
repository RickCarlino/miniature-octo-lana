require 'spec_helper'

describe Catgoose::Controller do
  let(:controller) { Catgoose::Controller.new(session: "any object will do") }

  it 'has a session attribute' do
    expect(controller.session).to eq("any object will do")
  end
end
