scp -P 5662 -r  dotcloud@wordpress.gliese.dotcloud.com:/home/dotcloud/code/ ~/wordpress
# back up database
#http://www.cyberciti.biz/tips/howto-copy-mysql-database-remote-server.html
mysqldump wordpress -hmysql.gliese.dotcloud.com -P 5185 -uroot -ppasswd  > wordpress.bak

# TODO
