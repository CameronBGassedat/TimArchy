FROM docker/whalesay:latest
LABEL Name=timarchy Version=0.0.1
RUN apt-get update -y
RUN apt install curl -y 
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*
CMD ["curl", "-sL -w", "%{http_code} 127.0.0.1:6379 -o /dev/null ; echo Exit code: $?"]
#CMD ["tail", "-f","/dev/null"]
#curl -sL -w "%{http_code}" 127.0.0.1:6379 -o /dev/null ; echo "Exit code: $?"