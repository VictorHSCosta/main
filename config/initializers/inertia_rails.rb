# Inertia.js configuration
InertiaRails.configure do |config|
  # Versioning for cache busting
  # Use ViteRuby.digest when available, fallback to timestamp
  config.version = -> do
    begin
      ViteRuby.digest
    rescue
      # Fallback para versão baseada em timestamp se ViteRuby não estiver disponível
      Rails.cache.fetch('inertia_version', expires_in: 1.hour) { Time.current.to_i.to_s }
    end
  end

  # Default layout for Inertia responses
  config.layout = "inertia"

  # Shared data across all Inertia responses
  config.shared_data = {
    # Adicione dados compartilhados aqui se necessário
  }
end
