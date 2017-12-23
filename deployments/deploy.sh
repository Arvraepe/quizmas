#!/bin/sh

pem="../deployments/security/codewars.pem"
aws="ec2-user@ec2-34-242-197-90.eu-west-1.compute.amazonaws.com"

echo "Start deployment Quizmas"

cd ../quizmas

echo "cw-engine: copying files to server"
ssh -i $pem $aws 'sudo rm -rf ~/quizmas/*'
scp -i $pem -r $(ls | grep -v -e node_modules ) ${aws}:~/quizmas
ssh -i $pem $aws 'cd ~/quizmas && npm install'
ssh -i $pem $aws 'node server.js'

echo "Quizmass: successfully deployed"