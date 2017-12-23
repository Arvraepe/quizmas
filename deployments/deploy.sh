#!/bin/sh

pem="../deployments/security/codewars.pem"
aws="ec2-user@ec2-34-242-197-90.eu-west-1.compute.amazonaws.com"

echo "Start deployment quizmas"

cd ../cw-engine

echo "cw-engine: copying files to server"
ssh -i $pem $aws 'sudo rm -rf ~/codewars/cw-engine/*'
scp -i $pem -r $(ls | grep -v -e node_modules ) ${aws}:~/codewars/cw-engine
ssh -i $pem $aws 'cd ~/codewars/cw-engine && npm install'
ssh -i $pem $aws 'sudo pm2 reload cw-engine'

echo "cw-engine: successfully deployed"