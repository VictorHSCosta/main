require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get root_url
    assert_response :success
    assert_select "h1", "Aplicação Rails criada com sucesso 🎉"
  end
end