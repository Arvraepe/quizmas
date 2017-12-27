#!/bin/sh

pem="../deployments/security/codewars.pem"
aws="ec2-user@ec2-34-242-197-90.eu-west-1.compute.amazonaws.com"

echo "Start backups gathering"

cd ../quizmas

echo "quizmas: copying files to server"
scp -i $pem -r ${aws}:~/quizmas/api/data/back-ups ./backups

echo "Quizmas: successfully gathered backups"