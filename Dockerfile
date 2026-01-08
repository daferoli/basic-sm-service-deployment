FROM registry.redhat.io/ubi9/nodejs-24-minimal

COPY . .

EXPOSE 8080

ENTRYPOINT node ping.js
