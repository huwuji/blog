# 选择一个体积小的镜像 (~5MB)
FROM node:14-alpine

# 设置为工作目录，以下 RUN/CMD 命令都是在工作目录中进行执行
WORKDIR /code

# 添加目录到工作目录，同时也会监听这些文件的变化
ADD yarn.lock package.json /code

# 执行构建指令
RUN yarn install

# 把代码置于镜像
ADD . /code

# RUN yarn build

EXPOSE 3000

# 启动 Node Server
CMD yarn start


