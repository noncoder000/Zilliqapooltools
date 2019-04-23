
plink.exe -ssh root@XXX.XXX.XXX.XXX -pw yourootpassword docker stop zil 
plink.exe -ssh root@XXX.XXX.XXX.XXX -pw yourootpassword rm -r /root/Desktop/join
plink.exe -ssh root@XXX.XXX.XXX.XXX -pw yourootpassword mkdir /root/Desktop/join
plink.exe -ssh root@XXX.XXX.XXX.XXX -pw yourootpassword wget https://mainnet-join.zilliqa.com/configuration.tar.gz -O /root/Desktop/join/configuration.tar.gz
plink.exe -ssh root@XXX.XXX.XXX.XXX -pw yourootpassword tar zxvf /root/Desktop/join/configuration.tar.gz -C /root/Desktop/join/
pscp.exe -r -pw yourootpassword C:\zilliqa\path\to\keys\constantsX.xml root@XXX.XXX.XXX.XXX:"/root/Desktop/join/constants.xml"
pscp.exe -r -pw yourootpassword C:\zilliqa\path\to\keys\mykeyXXX.txt root@XXX.XXX.XXX.XXX:"/root/Desktop/join/mykey.txt"
pscp.exe -r -pw yourootpassword C:\zilliqa\path\to\keys\launch_docker.sh root@XXX.XXX.XXX.XXX:"/root/Desktop/join/launch_docker.sh"
plink.exe -ssh root@XXX.XXX.XXX.XXX -pw yourootpassword sudo bash -x "/root/Desktop/join/launch_docker.sh"