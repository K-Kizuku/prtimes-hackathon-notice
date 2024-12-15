terraform {
  required_version = ">= 1.0.0"
  backend "s3" {
    bucket = "pr-times-notice-images-bucket"
    key    = "remote-backend/terraform.tfstate"
    region = "ap-northeast-1"
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-northeast-1"
}