#!/bin/bash

# chmod +x ./xxx.sh 

imageName='ssg-docker-image'

echo "Hello, Shell $imageName"

docker build -t $imageName ./

containerName='ssg-docker-container'

# 新建并启动
docker run -d -p 8080:80 --name $containerName $imageName

# 启动一个停止的容器
# docker start $containerName
