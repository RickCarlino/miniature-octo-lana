require 'spec_helper'

describe Catgoose::Config do
  before { Catgoose.config.reset }

  it 'sets the port' do
    Catgoose.config { |c| c.port = 123 }
    expect(Catgoose.config.port).to eq(123)
  end

  it 'sets the environment' do
    Catgoose.config { |c| c.env = :test }
    expect(Catgoose.config.env).to eq(:test)
  end

  it 'defaults to port 8080' do
    expect(Catgoose.config.port).to eq(8080)
  end

  it 'sets the environment' do
    expect(Catgoose.config.env).to eq(:development)
  end
end
