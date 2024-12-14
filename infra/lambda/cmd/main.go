package main

import (
	"context"
	"github.com/alecthomas/kong"
	"github.com/fujiwara/lamblocal"
)

type CLI struct {
	Foo string `help:"Foo." default:"foo" env:"FOO"`
}

func (c *CLI) Handler(ctx context.Context, _ interface{}) (string, error) {
	// c.Foo はデフォルト値、環境変数、コマンドライン引数から設定された状態になっている
	return c.Foo, nil
}

func main() {
	var c CLI
	kong.Parse(&c)
	lamblocal.Run(context.TODO(), c.Handler)
}
