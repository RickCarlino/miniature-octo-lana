require 'spec_helper'

describe Catgoose::RouteMapping do
  let(:mapping) { Catgoose::RouteMapping.new('route' => Catgoose::Controller) }

  it 'sets inputs' do
    expect(mapping.controller).to eq(Catgoose::Controller)
    expect(mapping.key).to eq('route')
    expect(mapping.input).to eq('route' => Catgoose::Controller)
  end

  it 'validates inputs' do
    expect{Catgoose::RouteMapping.new('wrong' => Class)}
      .to raise_error(Catgoose::InvalidControllerError)
    expect{Catgoose::RouteMapping.new(too: :many, keys: :here)}
      .to raise_error(Catgoose::BadRouteInputError)
    expect{Catgoose::RouteMapping.new('not a hash')}
      .to raise_error(Catgoose::BadRouteInputError)
  end
end
