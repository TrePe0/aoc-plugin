#!/bin/sh

set -e

mkdir -p output

VERSION=$(jq -r .version manifest.json)
FILES=$(jq -r .buildChrome.files[] package.json)

zip "output/aoc_time_logger-$VERSION-chrome.zip" $FILES
