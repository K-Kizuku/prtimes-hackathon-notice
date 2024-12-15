package main

import (
	"context"
	"log"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	v4 "github.com/aws/aws-sdk-go-v2/aws/signer/v4"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

// RequestはLambdaに渡されるイベントの例
type Request struct {
	BucketName   string `json:"bucket_name"`
	ObjectKey    string `json:"object_key"`
	LifetimeSecs int64  `json:"lifetime_secs"`
	Method       string `json:"method"` // "GET", "PUT", "DELETE", "POST"など
}

// ResponseはLambdaの戻り値の例
type Response struct {
	PresignedURL string            `json:"presigned_url"`
	Fields       map[string]string `json:"fields,omitempty"` // PostObject時に返されるフィールド
}

// PresignerはS3 Presign用のクライアントを内包
type Presigner struct {
	PresignClient *s3.PresignClient
}

// GetObject presigned URLを生成
func (presigner Presigner) GetObject(
	ctx context.Context, bucketName string, objectKey string, lifetimeSecs int64) (*v4.PresignedHTTPRequest, error) {
	request, err := presigner.PresignClient.PresignGetObject(ctx, &s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = time.Duration(lifetimeSecs) * time.Second
	})
	if err != nil {
		log.Printf("Couldn't get a presigned request to get %v:%v. Here's why: %v\n",
			bucketName, objectKey, err)
	}
	return request, err
}

// PutObject presigned URLを生成
func (presigner Presigner) PutObject(
	ctx context.Context, bucketName string, objectKey string, lifetimeSecs int64) (*v4.PresignedHTTPRequest, error) {
	request, err := presigner.PresignClient.PresignPutObject(ctx, &s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = time.Duration(lifetimeSecs) * time.Second
	})
	if err != nil {
		log.Printf("Couldn't get a presigned request to put %v:%v. Here's why: %v\n",
			bucketName, objectKey, err)
	}
	return request, err
}

// DeleteObject presigned URLを生成
func (presigner Presigner) DeleteObject(
	ctx context.Context, bucketName string, objectKey string) (*v4.PresignedHTTPRequest, error) {
	request, err := presigner.PresignClient.PresignDeleteObject(ctx, &s3.DeleteObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
	})
	if err != nil {
		log.Printf("Couldn't get a presigned request to delete object %v. Here's why: %v\n", objectKey, err)
	}
	return request, err
}

// PresignPostObject presigned POST用のURLとフォームフィールドを生成
func (presigner Presigner) PresignPostObject(
	ctx context.Context, bucketName string, objectKey string, lifetimeSecs int64) (*s3.PresignedPostRequest, error) {
	request, err := presigner.PresignClient.PresignPostObject(ctx, &s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
	}, func(options *s3.PresignPostOptions) {
		options.Expires = time.Duration(lifetimeSecs) * time.Second
	})
	if err != nil {
		log.Printf("Couldn't get a presigned post request to put %v:%v. Here's why: %v\n", bucketName, objectKey, err)
		return nil, err
	}
	return request, nil
}

// Lambdaハンドラー
func handler(ctx context.Context, req Request) (Response, error) {
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		log.Printf("Failed to load config: %v", err)
		return Response{}, err
	}

	client := s3.NewFromConfig(cfg)
	presigner := Presigner{
		PresignClient: s3.NewPresignClient(client),
	}

	var resp Response

	switch req.Method {
	case "GET":
		preReq, err := presigner.GetObject(ctx, req.BucketName, req.ObjectKey, req.LifetimeSecs)
		if err != nil {
			return Response{}, err
		}
		resp = Response{PresignedURL: preReq.URL}
	case "PUT":
		preReq, err := presigner.PutObject(ctx, req.BucketName, req.ObjectKey, req.LifetimeSecs)
		if err != nil {
			return Response{}, err
		}
		resp = Response{PresignedURL: preReq.URL}
	case "DELETE":
		preReq, err := presigner.DeleteObject(ctx, req.BucketName, req.ObjectKey)
		if err != nil {
			return Response{}, err
		}
		resp = Response{PresignedURL: preReq.URL}
	case "POST":
		postReq, err := presigner.PresignPostObject(ctx, req.BucketName, req.ObjectKey, req.LifetimeSecs)
		if err != nil {
			return Response{}, err
		}
		resp = Response{
			PresignedURL: postReq.URL,
			Fields:       postReq.Values,
		}
	default:
		// サポートしないHTTPメソッドの場合
		log.Printf("Unsupported method: %v", req.Method)
		return Response{}, nil
	}

	return resp, nil
}

func main() {
	lambda.Start(handler)
}
