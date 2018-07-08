package cmd

import (
	"github.com/urfave/cli"
	"gopkg.in/macaron.v1"
)

var Test = cli.Command{
	Name:  "test",
	Usage: "Start web server",
	Description: `MORhythm web server is the only thing you need to run,
and it takes care of all the other things for you`,
	Action: runTest,
	Flags: []cli.Flag{
		stringFlag("port, p", "3000", "Temporary port number to prevent conflict"),
		stringFlag("config, c", "custom/conf/app.ini", "Custom configuration file path"),
	},
}


func runTest(c *cli.Context) {
	m := macaron.Classic()
	m.Get("/hello", func() string {
		return "Maybe it is better to change yourself !"
	})
	m.Run()
}
