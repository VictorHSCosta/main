ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

# SimpleCov configuration for code coverage
if ENV["COVERAGE"]
  require 'simplecov'

  SimpleCov.start 'rails' do
    add_group 'Models', 'app/models'
    add_group 'Controllers', 'app/controllers'
    add_group 'Helpers', 'app/helpers'
    add_group 'Mailers', 'app/mailers'
    add_group 'Jobs', 'app/jobs'

    add_filter '/test/'
    add_filter '/config/'
    add_filter '/db/'
    add_filter '/vendor/'

    minimum_coverage 95
    minimum_coverage_by_file 80
  end

  SimpleCov.at_exit do
    SimpleCov.result.format!
    puts "\n\n📊 Coverage Summary:"
    puts "Total Coverage: #{SimpleCov.result.covered_percent.round(2)}%"
    puts "Files: #{SimpleCov.result.files.count}"
    puts "Lines: #{SimpleCov.result.total_lines}"
    puts "Covered Lines: #{SimpleCov.result.covered_lines}"
    puts "Missed Lines: #{SimpleCov.result.missed_lines}"
  end
end

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    # fixtures :all

    # Add more helper methods to be used by all tests here...

    # Include Factory Bot for test factories
    include FactoryBot::Syntax::Methods
  end
end

module ActionDispatch
  class IntegrationTest
    # Include Factory Bot for integration tests
    include FactoryBot::Syntax::Methods

    # Add sign_in helper for authentication tests
    def sign_in(user)
      post login_path, params: { email: user.email, password: 'password' }
    end

    def sign_out
      delete logout_path
    end
  end
end

# Configure Factory Bot
FactoryBot.reload
