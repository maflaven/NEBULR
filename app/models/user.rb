# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  filepicker_url  :string
#

class User < ActiveRecord::Base
  validates :username, :session_token, presence: true
  validates :password_digest, presence: { message: "Password can't be blank" }
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, uniqueness: true

  attr_reader :password
  after_initialize :ensure_session_token

  has_many :missions, foreign_key: :leader_id, dependent: :destroy
  has_many :enlists, class_name: 'Enlist', dependent: :destroy
  has_many :enlisted_missions, through: :enlists, source: :mission
  has_many :follows, class_name: 'Follow', dependent: :destroy
  has_many :followed_missions, through: :follows, source: :mission
  has_many :user_comments, foreign_key: :user_id, class_name: 'Comment'
  has_many :comments, as: :commentable
  has_many :ratings

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    user.try(:is_password?, password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  protected

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
