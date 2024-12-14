############################################
# ECRリポジトリ（フロントエンド、バックエンド）
############################################

resource "aws_ecr_repository" "frontend_repo" {
  name                 = "frontend-repo"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository" "backend_repo" {
  name                 = "backend-repo"
  image_tag_mutability = "MUTABLE"
}
