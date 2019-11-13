FROM alpine:latest

EXPOSE 3000/tcp

RUN echo "Setting up selfie user and it's home directory within the container"
RUN adduser -h /home/selfie -s /bin/bash -D selfie selfie
RUN apk add --progress --upgrade bash nodejs npm 
#haproxy

# Configure and start haproxy
#COPY config/haproxy.cfg /etc/haproxy
#RUN haproxy -q -f /etc/haproxy/haproxy.cfg -m 100 &

# Prefare the app itself
RUN mkdir /home/selfie/selfie.app
WORKDIR /home/selfie/selfie.app
RUN echo "Copying the sources to the container"
COPY . .

RUN echo "Building the selfie app from the sources"
RUN npm install
RUN chown -R selfie:selfie .

USER selfie

ENTRYPOINT ["npm", "start"]
#, "&&", "haproxy", "-f", "/etc/haproxy/haproxy.cfg", "-m", "100"]
