require 'spec_helper'

class FakeController < Catgoose::Controller; end

describe Catgoose::Router do
  # TEST THIS:
  # CatGoose.draw do |map|
  #   map.not_found OptionalNotFoundController # Has default
  #   map.error     OptionalErrorHandler # Has default
  # end
  let(:router) do
    router = Catgoose::Router.new
    router.draw do |map|
      map.route 'one' => Catgoose::Controller
      map.route 'two' => FakeController
    end
    router
  end

  it 'Maps a string route to a controller class' do
    expectation = {'one' => Catgoose::Controller,
                   'two' => FakeController}
    expect(router.map).to eq(expectation)
  end
  it 'accesses routes' do
    expect(router['one']).to eq(Catgoose::Controller)
  end
  it 'sets an error handler controller' # { on_error WhatEver }
  it 'sets an unknown error handler' # { not_found DontKnow }
end
