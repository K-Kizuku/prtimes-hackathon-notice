############################################
# セキュリティグループ
############################################

# ALB用SG
resource "aws_security_group" "lb_sg" {
  name        = "lb-sg"
  vpc_id      = aws_vpc.main.id
  description = "LB security group"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# フロントエンドECSタスク用SG
resource "aws_security_group" "frontend_sg" {
  name        = "frontend-sg"
  vpc_id      = aws_vpc.main.id
  description = "Frontend ECS security group"

  # ALBからの接続許可
  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = [aws_security_group.lb_sg.id]
  }

  # バックエンドへアクセスする場合のegress設定
  egress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # VPC内アクセス許可
  }

  # 全てのegress許可（必要に応じて絞る）
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# バックエンドECSタスク用SG
resource "aws_security_group" "backend_sg" {
  name        = "backend-sg"
  vpc_id      = aws_vpc.main.id
  description = "Backend ECS security group"

  # フロントエンドからのみ受信許可
  ingress {
    from_port       = 8000
    to_port         = 8000
    protocol        = "tcp"
    security_groups = [aws_security_group.frontend_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}