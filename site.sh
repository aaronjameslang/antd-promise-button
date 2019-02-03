#! /bin/sh
set -eux

#./test.sh
rm -rf site
mkdir site
typedoc --out site --mode file
cp -r coverage site/
rm -rf docs/sb && build-storybook -c .storybook -o site/storybook
