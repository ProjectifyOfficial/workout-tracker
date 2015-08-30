class RegistrationsController < Devise::RegistrationsController
    before_action :authenticate_user, except: [:new, :create]
end
