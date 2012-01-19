scp -P 5662 -r  dotcloud@wordpress.gliese.dotcloud.com:/home/dotcloud/code/ ~/wordpress
# back up database
mysqldump wordpress -hmysql.gliese.dotcloud.com -P 5185 -uroot -ppasswd  > wordpress.bak

# TODO
