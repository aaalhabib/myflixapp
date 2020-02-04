# turn on bash's job control
set -m

# Start the primary process and put it in the background
/docker-entrypoint.sh neo4j &

# Start the helper process
cypher-shell -u neo4j -p secret "CREATE CONSTRAINT ON (n:User) ASSERT n.id IS UNIQUE;"

# now we bring the primary process back into the foreground
# and leave it there
fg %1