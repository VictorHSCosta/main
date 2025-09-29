require "application_system_test_case"

class HomePageTest < ApplicationSystemTestCase
  test "shows the welcome message" do
    visit "/"
    assert_selector "h1", text: "Aplicação Rails criada com sucesso"
  end

  test "shows Tailwind CSS is active" do
    visit "/"
    assert_selector "span", text: "Tailwind CSS ativo"
  end
end