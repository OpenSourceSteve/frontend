#!/bin/sh
if [ -z "$1" ]; 
then 
    echo "You must supply a release version as a command line argument."; 
    exit 1;
fi
FRONTEND_RELEASE_ID=$1
RELEASE_PATH=/var/www/easylegal.app/releases/$FRONTEND_RELEASE_ID
mkdir $RELEASE_PATH
tar -xzvf build.tar.gz -C $RELEASE_PATH

# Update symbolic link (symlink) to current release
rm /var/www/easylegal.app/releases/current
ln -s $RELEASE_PATH/build /var/www/easylegal.app/releases/current
