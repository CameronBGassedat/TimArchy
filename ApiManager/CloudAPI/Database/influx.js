import {InfluxDB, Point} from '@influxdata/influxdb-client'
import {hostname} from 'node:os'

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
            console.log('CLOSE FINISHED')
        })
        .catch(e => {
            console.log('CLOSE FAILED', e)
        })
        res.send("Post successfully sent");
        return;
    }

    async GetPoint(query, res) {
        let readApi = this.client.getQueryApi(org);
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