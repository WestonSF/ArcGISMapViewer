sudo mkdir /var/www/.ssh
sudo chown www-data:www-data /var/www/.ssh/
sudo -u www-data ssh-keygen
sudo mkdir /var/www/mapviewer_demo
sudo chown www-data:www-data /var/www/mapviewer_demo/

sudo su www-data
cd mapviewer_demo
git clone git@github.com:SpliceGroup/mapviewer.git prod
git clone git@github.com:SpliceGroup/mapviewer.git uat
git clone git@github.com:SpliceGroup/mapviewer.git develop

cd /var/www/mapviewer_demo/uat
#git fetch
#git remote show origin
git checkout -b uat origin/uat

cd /var/www/mapviewer_demo/develop
git checkout -b develop origin/develop
