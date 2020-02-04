FROM neo4j:4.0 as GraphDB

ENV NEO4J_AUTH=neo4j/secret

#RUN apk add --no-cache --quiet procps

COPY neo4jstart.sh neo4jstart.sh

ENTRYPOINT ["./neo4jstart.sh"]
