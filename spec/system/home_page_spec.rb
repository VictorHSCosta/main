require "rails_helper"

RSpec.describe "Home page", type: :system do
  it "shows the welcome message" do
    visit "/"
    expect(page).to have_content("Aplicação Rails criada com sucesso")
  end
end