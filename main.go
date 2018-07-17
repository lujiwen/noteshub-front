package main

import (
	"github.com/urfave/cli"
	"mo/cmd"
	"os"
)

func main() {
	app := cli.NewApp()
	app.Name = "mo"
	app.Usage = "create the notes faster than yesterday!"
	app.Commands = []cli.Command{
		//cmd.Serv,
		//cmd.Test,
		cmd.Web,
	}
	app.Flags = append(app.Flags, []cli.Flag{}...)
	app.Run(os.Args)
}
