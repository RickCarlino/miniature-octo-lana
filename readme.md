Ruby websocket microframework focusing on ease of use and ease of maintenance.

# Intended implementation

```ruby

  CatGoose.config do |c|
    c.port = 8080
    c.env  = :development
  end

  class YourControllerClass < Mutations::Command
  end

  CatGoose.routes do
    route 'your_action_name' => YourControllerClass
    route 'comments#create' => CommentsController::Create
    not_found OptionalNotFoundController
    error OptionalErrorHandler
  end

  CatGoose.before_message do |socket, payload|
    @current_user = User.find(params[:id])
  end

  CatGoose.on_error { |socket| socket.send_text 'Opps!!'}
  CatGoose.on_open  { |socket| socket.send_text 'Quack!'}
  CatGoose.on_close { |socket| socket.send_text 'Meoww!'}

  CatGoose.fly
```

# TODO:

 * Better router (main means of specifying controllers)
 * Specify not_found
 * Implement environments
 * Write tests
 * Security / DDoS protection / throttle settings
 * Post install message: https://github.com/jnunemaker/httparty/blob/e38baab559bb078ee421676b752d9877e5828b48/httparty.gemspec#L18
