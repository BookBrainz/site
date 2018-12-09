#!/bin/bash

if [[ ! -d "src" ]]; then
    echo "This script must be run from the top level directory of the bookbrainz-site source."
    exit -1
fi

docker-compose up -d elasticsearch postgres redis &&
docker-compose up --build bookbrainz-site
