echo.> C:\Users\yourpc\Desktop\new.txt
echo.>> C:\Users\yourpc\Desktop\new.txt
echo.YOUR IP >> C:\Users\yourpc\Desktop\new.txt
plink.exe -ssh root@YOURIP -pw YOURPASS "grep 'I am' /root/Desktop/join/zilliqa-00001-log.txt | tail -n -2" >> C:\Users\yourpc\Desktop\new.txt
echo.>> C:\Users\yourpc\Desktop\new.txt
echo.>> C:\Users\yourpc\Desktop\new.txt



