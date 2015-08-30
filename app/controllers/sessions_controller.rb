class SessionsController < Devise::SessionsController
    before_action :authenticate_user, except: [:new, :create]
end
