#!/bin/sh

# Build and tarball the app
npm run build
tar -zcvf build.tar.gz build
# Copy the tarball to PROD box
scp build.tar.gz root@www.easylegal.app:/root

# # Login to production box and create new release directory
if [ -z "$1" ]; 
then 
    echo "You must supply a release version as a command line argument."; 
    exit 1;
fi
FRONTEND_RELEASE_ID=$1
ssh -T root@www.easylegal.app 'sh -s' < ./scripts/remote.sh $FRONTEND_RELEASE_ID
    