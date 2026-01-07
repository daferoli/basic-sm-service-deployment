FROM ubi9/nodejs-24-minimal

COPY . .

ENTRYPOINT node ping.js
