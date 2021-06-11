#!usr/bin/sh

echo "build all packages"
cd ..
yarn && yarn build

echo "back to playground"
cd playground