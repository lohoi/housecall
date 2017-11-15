# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

# config.ru
 
# This file is used by Rack-based servers to start the application.
 
use Rack::Rewrite do
  rewrite %r{^(?!.*(api|\.)).*$}, '/index.html'
end
 
require ::File.expand_path('../config/environment',  __FILE__)
run Rails.application

run Rails.application
