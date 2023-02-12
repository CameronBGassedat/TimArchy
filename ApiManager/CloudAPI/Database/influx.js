import bodyParser from 'body-parser';
import {InfluxDB, Point} from '@influxdata/influxdb-client'
import {hostname} from 'node:os'
import express from 'express'

const org = `TimArchy`
const token = "THISISMYTOKENAPI"
const url = 'http://localhost:8086'

export class Database {
    constructor() {
        this.client = new InfluxDB({url, token})
    }

    async PostPoint(bucket , point) {
        let writeApi = this.client.getWriteApi(org, bucket)
        writeApi.useDefaultTags({location: hostname()})
        writeApi.writePoint(point)
        writeApi
        .close()
        .then( () => {
            console.log('CLOSE FINISHED')
        })
        .catch(e => {
            console.log('CLOSE FAILED', e)
        })
        res.send(jsonBody.name + 'with ID : '+ jsonBody.id +' Added');
        return;
    }

    async GetPoint(query) {
        let readApi = client.getQueryApi(org);
        readApi.queryRows(query, {
            next(row, tableMeta) {
              const o = tableMeta.toObject(row);
              var node = new Sensor(o._measurement, o.id, o.name, o.data, o.roomID)
              objects.push(node)
            },
            complete() { 
                console.log('FINISHED')
                res.status(200).send(objects)
            },
            error(error) {
                res.status(404).send("QUERY FAILED, "+ {error})
            },
        })
        return;
    }
}