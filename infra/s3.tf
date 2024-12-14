############################################
# S3バケット (オブジェクトストレージ)
# 画像を格納し、public GETが可能
############################################

resource "aws_s3_bucket" "images_bucket" {
  bucket = "pr-times-notice-images-bucket"
}

resource "aws_s3_bucket_ownership_controls" "images_bucket_ownership_controls" {
  bucket = aws_s3_bucket.images_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "images_bucket_block" {
  bucket = aws_s3_bucket.images_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# resource "aws_s3_bucket_acl" "images_bucket_acl" {
#   depends_on = [
#     aws_s3_bucket_ownership_controls.images_bucket_ownership_controls,
#     aws_s3_bucket_public_access_block.images_bucket_block,
#   ]
#   bucket = aws_s3_bucket.images_bucket.id
#   acl    = "public-read"
# }

resource "aws_s3_bucket_policy" "images_bucket_policy" {
  bucket = aws_s3_bucket.images_bucket.id
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${aws_s3_bucket.images_bucket.id}/*"
    }
  ]
}
POLICY
}