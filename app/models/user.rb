class User < ApplicationRecord

  enum user_type: [:doctor, :patient, :admin]

  enum specialty: [:general, :cardiology, :orthopedic_surgery,
                   :gastroentrerology, :dermatology,
                   :anesthesiology, :plastic_surgery]

  after_initialize :set_defaults, :if => :new_record? 

  # VALIDATIONS
  validates :firstname, presence: true, length: { maximum: 25 }
  validates :lastname, presence: true, length: { maximum: 25 }

  validates :skype, presence: true, length: { maximum: 50 }

  
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  before_save   :downcase_email
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }  

  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
  has_secure_password

  private
  def set_defaults
    self.user_type ||= :patient
  end

  # Converts email to all lower-case.
  def downcase_email
    self.email = email.downcase
  end

end
