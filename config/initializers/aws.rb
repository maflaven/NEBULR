AWS.config(access_key_id:     Figaro.env.AWS_ACCESS_KEY_ID,
           secret_access_key: Figaro.env.AWS_SECRET_ACCESS_KEY )

S3_BUCKET = AWS::S3.new.buckets[Figaro.env.S3_BUCKET]
