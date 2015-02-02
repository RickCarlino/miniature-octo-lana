## Catgoose

A Ruby websocket framework ontop of EM::WebSocket focused on developer happiness and convention over configuration.

Ease of use and ease of maintenance are the main design concerns.

## Is It Any Good?

Yes.

## How Do I Use This Thing?

```ruby
  require 'catgoose'

  Catgoose.config do |c|
    c.port = 8080
    c.env  = :development
  end


  class CreateUser < Catgoose::Controller
    # Catgoose::Controller is a 'Mutation' object subclass.
    # Learn more at https://github.com/cypriss/mutations
    required do
      string 'name'
    end

    optional do
      integer 'cares_given', default: 0
    end

    def execute
      # session object lives for duration of socket connection.
      session[:name] = name
      {name: name}
    end
  end


  class CreateMessage < Catgoose::Controller
    required do
      string 'message'
    end

    def execute
      {message: message, from: session[:name]}
    end
  end

  Catgoose.draw do |map|
    map.route     'authenticate'   => CreateUser
    map.route     'message.create' => CreateMessage
    map.not_found OptionalNotFoundController # Optional. Has default.
    map.error     OptionalErrorHandler       # Optional. Has default.
  end

  Catgoose.before_message do |socket, payload|
    # blah blah
  end

  Catgoose.after_message do |socket, payload|
    # Whatever
  end

  Catgoose.on_open  { |socket| socket.send_text 'Quack!'}
  Catgoose.on_close { |socket| socket.send_text 'Hisss!'}

  Catgoose.fly
```

# TODO:

 * Make a better default not_found controller
 * Implement a redirect_to method for before_message
 * Support for WSS
 * Implement environments
 * DDoS protection / throttle settings
 * Add post install message
 * Rescue_from
 * hot reloads in dev env.
 * Show all possible routes on 404.
