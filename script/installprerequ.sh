#!/bin/bash
#
#


sudo apt-get update


sudo apt-get install -y nodejs
sudo apt-get install npm
sudo npm install npm@5.6.0 -g
sudo apt-get install git

sudo apt-get install golang
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin

curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

