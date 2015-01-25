require 'spec_helper'

describe Catgoose::Router do
  # TEST THIS:
  # CatGoose.draw do |map|
  #   map.not_found OptionalNotFoundController # Has default
  #   map.error     OptionalErrorHandler # Has default
  # end
  let(:router) { Catgoose::Router.new }

  it 'Maps a string route to a controller class' do
    pending
    router.draw do |map|
      map.route 'move' => Catgoose::Controller
    end
  end
end
