
#Notes

### (1) cors:

<!-- Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # allow all origins use '*'
    ## normally if I know my front end origin was localhost:3001 then do the following:
    # origins 'localhost:3001'
    resource '*',
      headers: :any, # any body is allowed to make request to this paticular server
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end -->

###
