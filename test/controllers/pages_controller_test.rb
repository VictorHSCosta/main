require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get home with inertia" do
    get root_url

    assert_response :success
    assert_equal 'Home', @controller.inertia.page.component
    assert_not_nil @controller.inertia.page.props[:appName]
    assert_not_nil @controller.inertia.page.props[:hero]
    assert_not_nil @controller.inertia.page.props[:benefits]
    assert_not_nil @controller.inertia.page.props[:navigation]
    assert_not_nil @controller.inertia.page.props[:current_year]
  end

  test "should include required hero props" do
    get root_url

    hero = @controller.inertia.page.props[:hero]
    assert_equal 'Desenvolva Aplicações Web', hero[:title]
    assert_equal 'Poderosas e Escaláveis', hero[:subtitle]
    assert hero[:description].present?
    assert hero[:primary_cta].present?
    assert hero[:secondary_cta].present?
  end

  test "should include benefits with correct structure" do
    get root_url

    benefits = @controller.inertia.page.props[:benefits]
    assert_equal 6, benefits.length

    benefits.each do |benefit|
      assert benefit[:title].present?
      assert benefit[:description].present?
      assert benefit[:icon].present?
      assert benefit[:color].present?
    end
  end

  test "should include navigation items" do
    get root_url

    navigation = @controller.inertia.page.props[:navigation]
    assert_equal 4, navigation.length

    navigation.each do |item|
      assert item[:name].present?
      assert item[:href].present?
    end
  end
end