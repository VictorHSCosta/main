# Inertia.js configuration
InertiaRails.configure do |config|
  # Versioning for cache busting
  # This will be updated once Vite is installed
  config.version = -> { ViteRuby.digest rescue "1.0" }

  # Default layout for Inertia responses
  config.layout = "inertia"
end
