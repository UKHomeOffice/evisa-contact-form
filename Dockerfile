FROM quay.io/ukhomeofficedigital/hof-nodejs:24.21.0-alpine3.24-v6@sha256:965808f37507eef8947461acc32a1bb9109ef6867731c9751ff0145232633908

USER root

# Update Alpine packages with latest security and bug fixes
RUN apk upgrade --no-cache


# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app

COPY --chown=999:998 . /app

RUN yarn cache clean && \
    yarn install --frozen-lockfile --production && \
    yarn run postinstall

# Patch (golang.org/x/text) present in the pinned base image
RUN apk upgrade --no-cache golang.org/x/text

# Patch (stdlib) present in the pinned base image
RUN apk upgrade --no-cache stdlib

HEALTHCHECK --interval=5m --timeout=3s \
CMD curl --fail http://localhost:8080 || exit 1

CMD ["sh", "/app/run.sh"]

EXPOSE 8080
