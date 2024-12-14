output "frontend_url" {
  value = "https://${var.domain}"
}

output "lambda_api_endpoint" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
}