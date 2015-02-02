require 'spec_helper'

describe Catgoose::NotFoundController do
  let(:controller) { Catgoose::NotFoundController }

  it 'informs user of unresolved routes' do
    expect(subject.run.errors.message[:action]).to eq(
      "We could not find an action with that name.")
  end
end
