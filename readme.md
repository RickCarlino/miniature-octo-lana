# Catgoose

A Ruby websocket framework ontop of EM::WebSocket focused on developer happiness and convention over configuration.

Ease of use and ease of maintenance are the main design concerns.

# Is It Any Good?

Yes.

# How Do I Use This Thing?

```ruby

  Catgoose.config do |c|
    c.port = 8080
    c.env  = :development
  end

  class MessageSend < Catgoose::Controller
    # Catgoose::Controller is a 'Mutation' object subclass.
    # Learn more at https://github.com/cypriss/mutations

    required do
      string 'user'
      string 'message'
    end

    def execute
      {echo: "Hi, #{user}. You said: #{message}"}
    end
  end

  Catgoose.draw do |map|
    map.route       'message.send' => MessageSend
    map.not_found   OptionalNotFoundController # Optional. Has default.
    map.error       OptionalErrorHandler # Optional. Has default.
  end

  Catgoose.before_message do |socket, payload|
    @current_user = User.find(params[:id])
  end

  Catgoose.after_message do |socket, payload|
    @current_user = User.find(params[:id])
  end

  Catgoose.on_open  { |socket| socket.send_text 'Quack!'}
  Catgoose.on_close { |socket| socket.send_text 'Hisss!'}

  Catgoose.fly
```

# TODO:

 * Implement Catgoose::Session object to hold generic data.
 * Better router (main means of specifying controllers)
 * Specify not_found
 * Support for WSS
 * Implement environments
 * DDoS protection / throttle settings
 * Add post install message: https://github.com/jnunemaker/httparty/blob/e38baab559bb078ee421676b752d9877e5828b48/httparty.gemspec#L18
 * Rescue_from
 * hot reloads in dev env.
 * Show all possible routes on 404.
