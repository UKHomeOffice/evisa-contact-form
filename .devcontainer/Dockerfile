FROM quay.io/ukhomeofficedigital/hof-nodejs:24.21.0-alpine3.24-v6@sha256:965808f37507eef8947461acc32a1bb9109ef6867731c9751ff0145232633908

USER root

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app
