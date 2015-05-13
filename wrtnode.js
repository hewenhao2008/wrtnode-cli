#!/usr/bin/env node

function say_hello()
{
    console.log("Welcome to use WRTNode CLI.")
}

function LOGD(msg)
{
    console.log(msg);
}

function LOGE(msg)
{
    console.error(msg);
}

function Usage()
{
    console.log("\n"
                + "wrtnode ?                      -- Show all avaliable command.\n"
                + "wrtnode wifi list              -- list wifi\n"
                + "wrtnode wifi set ssid password -- set wifi\n");
}

function wifi_list()
{
    LOGD("This is list wifi function.");

    var http = require("http");

    var options = {
        hostname: '192.168.8.1',
        port: 80,
        path: '/cgi-bin/aps',
        method: 'GET'
    };

    var req = http.request(options, function(res) {
        LOGD(JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            LOGD(chunk);
        });
    });
    
    req.end();
}

function wifi_set(ssid, password)
{
    LOGD("SSID: " + ssid + " PASSWORD: " + password);

    var http = require("http");

    var options = {
        hostname: '192.168.8.1',
        port: 80,
        path: '/cgi-bin/setwifi?ssid=' + ssid + "&password=" + password,
        method: 'GET'
    };

    var req = http.request(options, function(res) {
        LOGD(JSON.stringify(res.headers));
    });

    req.end();
}

function do_command_line()
{
    say_hello();

    LOGD("CMD LINE SIZE: " + process.argv.length);
    LOGD("CMD LINE ARGV: " + process.argv);

    if (process.argv.length < 3) {
        Usage();
    } else {
        if (process.argv[2] == "wifi") {
            if (process.argv[3] == "list") {
                wifi_list();
            } else if (process.argv[3] == "set") {
                if (process.argv.length != 6) {
                    Usage();
                    process.exit(1);
                }
                wifi_set(process.argv[4], process.argv[5]);
            }
        }
    }
}

do_command_line();