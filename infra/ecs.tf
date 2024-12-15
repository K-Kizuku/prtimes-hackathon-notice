############################################
# ECSタスク定義・サービス (フロントエンド)
############################################

resource "aws_ecs_task_definition" "frontend_task" {
  family                   = "frontend"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512

  execution_role_arn = aws_iam_role.ecs_task_execution.arn
  task_role_arn      = aws_iam_role.ecs_task_execution.arn

  container_definitions = <<DEFS
[
  {
    "name": "frontend",
    "image": "${aws_ecr_repository.frontend_repo.repository_url}:latest",
    "essential": true,
    "portMappings": [
      {
        "containerPort": 3000
      }
    ]
  }
]
DEFS
}


resource "aws_ecs_service" "frontend_service" {
  name            = "frontend-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.frontend_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_c.id]
    security_groups  = [aws_security_group.frontend_sg.id]
    assign_public_ip = true

  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend_tg.arn
    container_name   = "frontend"
    container_port   = 3000
  }

  depends_on = [
    aws_lb_listener.https_listener
  ]
}

############################################
# ECSタスク定義・サービス (バックエンド)
# バックエンドはPublicには出さず、Private subnetにのみ配置
############################################

resource "aws_ecs_task_definition" "backend_task" {
  family                   = "backend"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512

  execution_role_arn = aws_iam_role.ecs_task_execution.arn
  task_role_arn      = aws_iam_role.ecs_task_execution.arn

  container_definitions = <<DEFS
[
  {
    "name": "backend",
    "image": "${aws_ecr_repository.backend_repo.repository_url}:latest",
    "essential": true,
    "portMappings": [
      {
        "containerPort": 8000
      }
    ]
  }
]
DEFS
}

resource "aws_ecs_service" "backend_service" {
  name            = "backend-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets         = [aws_subnet.public_subnet_a.id]
    security_groups = [aws_security_group.backend_sg.id]
  }
}


############################################
# ECSクラスター
############################################

resource "aws_ecs_cluster" "main" {
  name = "main-cluster"
}