#! /bin/bash

NAME=$1

FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../src" && pwd)

re="[[:space:]]+"

if [ "$#" -ne 1 ] || [[ $NAME =~ $re ]] || [ "$NAME" == "" ]; then
  echo "Usage: pnpm gc \${name} with no space"
  exit 1
fi

DIRNAME="$FILE_PATH/stores/$NAME.ts"

if [ -d "$DIRNAME" ]; then
  echo "$NAME store already exists, please change it"
  exit 1
fi

NORMALIZED_NAME=""
for i in $(echo $NAME | sed 's/[_|-]\([a-z]\)/\ \1/;s/^\([a-z]\)/\ \1/'); do
  C=$(echo "${i:0:1}" | tr "[:lower:]" "[:upper:]")
  NORMALIZED_NAME="$NORMALIZED_NAME${C}${i:1}"
done
NAME=$NORMALIZED_NAME
STORE=use${NAME^}Store

touch "$DIRNAME"

cat > $DIRNAME <<EOF
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const $STORE = defineStore('$NAME', () => {
  return { }
})
EOF
