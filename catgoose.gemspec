lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

Gem::Specification.new do |gem|
  gem.name          = 'catgoose'
  gem.version       = '0.0.1'
  gem.platform      = Gem::Platform::RUBY
  gem.authors       = ['Rick Carlino']
  gem.email         = ['rick.carlino@gmail.com']
  gem.description   = 'Websocket microframework'
  gem.summary       = 'Websocket microframework'
  gem.homepage      = 'https://github.com/rickcarlino/catgoose'

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ['lib']

  gem.required_ruby_version = '>= 2.1'

  gem.add_runtime_dependency 'em-websocket'
  gem.add_runtime_dependency 'mutations'

  gem.add_development_dependency 'rspec'
  gem.add_development_dependency 'pry'
  gem.add_development_dependency 'pry-nav'
  gem.add_development_dependency 'simplecov'
end
