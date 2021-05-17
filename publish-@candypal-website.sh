#!/usr/bin/env bash

TAG=0
BASEDIR=$(dirname "$0")
echo "BASEDIR=$BASEDIR"
SRC_SCHEMATICS="projects/candypal/website/src/schematics"
DIST_SCHEMATICS="dist/candypal/website/schematics"

if [ -n "$1" ]; then
  TAG=${1}
  echo $TAG
  echo $1
fi

# version increase
cd projects/candypal/website
npm version patch
cd ../../..
pwd

ng build @candypal/website --prod
echo "Library build done..."
#npm run @candypal/website-schematics
echo "Schematics build done..."
echo "==== Moving JSON files ====="

pwd
cp projects/candypal/website/src/schematics/collection.json dist/candypal/website/schematics/collection.json | true
cp projects/candypal/website/src/schematics/migration.json dist/candypal/website/schematics/migration.json | true
cp projects/candypal/website/src/schematics/website/schema.json dist/candypal/website/schematics/website/schema.json | true
cp -R projects/candypal/website/src/schematics/website/files dist/candypal/website/schematics/website/files | true
pwd

echo "-----Publishing artifacts to npm -----"
cd dist/candypal/website
pwd

TAG="beta"
if [ $TAG -nt 0 ];
then
  npm publish --access public --tag $TAG
else
  npm publish --access public
fi

cd ../../..
pwd

echo "DONE..."
