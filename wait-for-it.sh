#!/usr/bin/env bash
# wait-for-it.sh

set -e

host="$1"
shift
port="$1"
shift
cmd="$@"

while ! nc -z "$host" "$port"; do
  echo "Aguardando o serviço $host:$port..."
  sleep 2
done

exec $cmd