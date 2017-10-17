require 'test_helper'

class PatientMailerTest < ActionMailer::TestCase
  test "account_activation" do
    user = User.first
    password = "blahblah1"
    mail = PatientMailer.account_activation(user, password)
    assert_equal "Account activation", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
