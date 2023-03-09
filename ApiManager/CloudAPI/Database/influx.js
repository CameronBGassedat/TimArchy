import {InfluxDB, Point} from '@influxdata/influxdb-client'
import {hostname} from 'node:os'
import Sensor from "../Models/sensor.mjs"

const org = `TimArchy`
const token = "THISISMYTOKENAPI"
const url = 'http://localhost:8086'

export default class Database {
    constructor() {
        this.client = new InfluxDB({url, token})
    }

    async PostPoint(bucket, point, res) {
        let writeApi = this.client.getWriteApi(org, bucket)
        writeApi.useDefaultTags({location: hostname()})
        writeApi.writePoint(point)
        writeApi
        .close()
        .then( () => {
            console.log('Close Complete')
        })
        .catch(e => {
            console.log('close FAILED', e)
        })
        res.send("Post successfully sent");
        return;
    }

    async GetPoint(query, res) {
        let readApi = this.client.getQueryApi(org);
        let nodeArray = []
        readApi.queryRows(query, {
            next(row, tableMeta) {
              const o = tableMeta.toObject(row);
              var node = new Sensor(o.id, o._measurement, o._value, o.roomID)
              nodeArray.push(node)
            },
            complete() { 
                console.log('Complete Get Point')
                res.status(200).send(nodeArray)
            },
            error(error) {
                console.log('Error Get Point')
                res.status(404).send("QUERY FAILED, "+ {error})
            },
        })
        return;
    }
}