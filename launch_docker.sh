#!/bin/bash

prog=$(basename $0)
mykeyfile=/root/Desktop/join/mykey.txt
myaddrfile=/root/Desktop/join/myaddr.txt
image=zilliqa/zilliqa:v4.5.0
os=$(uname)

case "$os" in
    Linux)
        # we should be good on Linux
        ;;
    Darwin)
        echo "This script doesn not support Docker for Mac"
        exit 1
        ;;
    *)
        echo "This script does not support Docker on your platform"
        exit 1
        ;;
esac

function genkeypair() {
if [ -s $mykeyfile ]
then
    echo -n "$mykeyfile exist, overwrite [y/N]?"
    read confirm && [ "$confirm" != "yes" -a "$confirm" != "y" ] && return
fi
sudo docker run --rm $image -c genkeypair > $mykeyfile
}

function run() {

name="zil"
ip=`curl https://ipinfo.io/ip`;
port="33133"

if [ "$1" = "cuda" ]
then
    cuda_docker="--runtime=nvidia"
    image="$image-cuda"
fi

workdir=/run/zilliqa

if [ ! -s $mykeyfile ]
then
    echo "Cannot find $mykeyfile, generating new keypair for you..."
    sudo docker run $image -c genkeypair > $mykeyfile && echo "$mykeyfile generated"
fi

prikey=$(cat $mykeyfile | awk '{ print $2 }')
pubkey=$(cat $mykeyfile | awk '{ print $1 }')


cmd="./downloadIncrDB.py > download.log 2>&1"
sudo docker run $cuda_docker --network host --rm  -v /root/Desktop/join:/run/zilliqa -w $workdir --name $name $image -c "$cmd"
sudo docker stop $name

cmd="zilliqa --privk $prikey --pubk $pubkey --address $ip --port $port --synctype 1 --recovery"

echo "Running in docker with command: '$cmd'"
sudo docker run $image -c "getaddr --pubk $pubkey" > $myaddrfile
sudo docker run $cuda_docker --cpu-quota="14000" --network host --rm -d -v /root/Desktop/join:/run/zilliqa -w $workdir --name $name $image -c "$cmd"

echo
echo "Use 'docker ps' to check the status of the docker"
echo "Use 'docker stop $name' to terminate the container"
echo "Use 'tail -f zilliqa-00001-log.txt' to see the runtime log"
}

function cleanup() {
rm -rfv "*-log.txt"
}

function usage() {
cat <<EOF
Usage: $prog [OPTIONS]
Options:
    --genkeypair            generate new keypair and saved to '$mykeyfile'
    --cuda                  use nvidia-docker for mining
    --cleanup               remove log files
    --help                  show this help message
EOF
}

case "$1" in
    "") run;;
    --genkeypair) genkeypair;;
    --cleanup) cleanup;;
    --cuda) run cuda;;
    --help) usage;;
    *) echo "Unrecongized option '$1'"; usage;;
esac
