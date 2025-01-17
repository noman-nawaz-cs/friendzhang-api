#!/bin/bash

# Define the EC2 instance details
EC2_USER="ubuntu"
EC2_HOST="ec2-100-26-107-114.compute-1.amazonaws.com"  # Replace with your EC2 instance's IP address
EC2_PATH="friendzhang-api"  # Replace with the actual path to your project on the EC2 instance
GITHUB_REPO="https://github.com/noman-nawaz-cs/friendzhang-api.git"  # Replace with your GitHub repository URL

# SSH into the EC2 instance and pull the latest code
ssh -tt -i ~/Downloads/nodejs-key.pem $EC2_USER@$EC2_HOST << EOF
  cd $EC2_PATH
  git pull origin main  # Replace with your branch name if it's not 'main'
  npm install           # Install dependencies
  npm run build         # Build the app (if needed)
  pm2 restart app       # Restart the app using pm2 (or any process manager you're using)
  exit
EOF
