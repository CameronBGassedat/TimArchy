FROM influxdb:latest

ENV INFLUX_ROOT_PASSWORD=root
ENV INFLUX_DATABASE=user_db

VOLUME [ "/var/lib/influx" ]

RUN influx bucket create -n ROOM -o TimArchy -r 0
RUN influx bucket create -n BUILDING -o TimArchy -r 0
RUN influx bucket create -n SENSOR -o TimArchy -r 0

EXPOSE 3306