PORT=3000
MONGO_URL=mongodb://pyre:hack@alex.mongohq.com:10022/HackathonDB
meteor bundle pyre.tar.gz
tar zxvf pyre.tar.gz 
node bundle/main.js &
