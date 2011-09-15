#Rsync 服务端的配置：
vim /etc/rsyncd.conf

	[html]
	path = /usr/local/nginx/html
	comment = sync for  files between mirror and production
	hosts allow = 10.1.2.65 10.1.2.64 #多个iP用空格隔开

rsync --daemon --config=/etc/rsyncd.conf

#客服端的同步脚本
rsync -vzrltopg --progress root@192.168.194.7::html /usr/local/nginx/html
