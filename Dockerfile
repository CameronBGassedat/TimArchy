FROM docker/whalesay:latest
LABEL Name=timarchy Version=0.0.1
#RUN apt-get -y update && apt-get install -y fortunes
RUN apt-get update && apt-get install curl
#CMD ["curl", "-sL -w", "%{http_code} 127.0.0.1:6379 -o /dev/null"]
#
CMD ["tail", "-f","/dev/null"]

