#!/bin/sh

set -e
influx bucket create -n ROOM -o TimArchy -r 0
influx bucket create -n BUILDING -o TimArchy -r 0
influx bucket create -n SENSOR -o TimArchy -r 0