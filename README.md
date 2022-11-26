# TaxManagement


=> In this assignment i have created multiple users that are tax payers, tax accountant and admin where tax payer is the user who is giving the tax and tax accountant is user who can acess every information about tax payers 
=> there are two type of tax one is buisness tax and other is person or citizen income tax 
=> i have created api for creating diffrent user and handle validations 
=> i have created api for creation of tax with some validation 
=> i have created a protective api with hashing of password for authorization
=> i have created 8 apis for this project like tax due tax status included creating



Manage My Contacts
AWS Creds:
Login - 
Link: https://275284243165.signin.aws.amazon.com/console
Username: mmc-application
Pwd: X2OdU6XVFS4tIa$
EC2 =>
Public DNS: 
ssh -i simbaquartz-mmc.pem ubuntu@ec2-3-110-6-182.ap-south-1.compute.amazonaws.com
Step 1- Install node js 
curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh
bash install_nvm.sh
export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm install --lts
node --version
Step 2 - Clone project from github 
# set up git
sudo apt-get install git
# Start ssh agent
eval `ssh-agent -s`
# to check added identities
ssh-add -l
# Generate new ssh key to be used for deployments
# to generate a new key
ssh-keygen -t rsa -b 4096 
# Add identity to ssh agent
ssh-add /home/ubuntu/.ssh/id_rsa
# Copy public key from below location and add to github/bitbucket keys
cat /home/ubuntu/.ssh/id_rsa.pub
# Add Git repository deployment access keys, below instructions are for Github hosted repositories only
https://github.com/SimbaQuartz/MMC-backend/settings/keys
# Clone the repository
git clone git@github.com:SimbaQuartz/MMC-backend.git
Step 3- Setup PM2 process manager to keep your app running 
npm i pm2 -g
pm2 start app (or whatever your file name)
# Other pm2 commands
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Show log stream)
pm2 flush (Clear logs)
# To make sure app starts when reboot
pm2 startup ubuntu
Step 4- Setup ufw firewall
sudo ufw enable
sudo ufw status
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)
Step 5- Install NGINX and configure
    sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
Add the following to the location part of the server block
   server_name yourdomain.com www.yourdomain.com;
    location / {
        proxy_pass http://localhost:5000; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
# Check NGINX config
sudo nginx -t
# Restart NGINX
sudo service nginx restart
Step 6- Add instance public ip record in domain dns settings.
Step 7- Add SSL with LetsEncrypt
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo ufw status
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'
sudo certbot --nginx -d api-mmc.simbaquartz.com
sudo certbot renew --dry-run
