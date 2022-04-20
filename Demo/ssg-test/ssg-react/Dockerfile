# 选择基础镜像进行构建
FROM node:alpine as builder

ENV NODE_ENV production

# 创建工作目录
WORKDIR /code

# 添加目录到工作目录，同时也会监听这些文件的变化
ADD yarn.lock package.json /code

# 执行构建指令
RUN yarn install

# 以上ADD---RUN是一个构建过程，会缓存结果，每次监听到yarn.lock package.json文件变化，就会执行对应的RUN指令
# 分开执行ADD---RUN，减少不必要的指令执行

ADD . /code

RUN yarn build


# todo
# ADD ./build /code/build

#分阶段构建

# 选择nginx基础镜像进行另一阶段的构建
FROM nginx:alpin

# 删除nginx 默认配置(后边路径说明nginx镜像以linux系统作为基础镜像)
RUN rm /etc/nginx/conf.d/default.conf 

# 添加我们自己的配置 default.conf 在下面
ADD default.conf /etc/nginx/conf.d/ 

# 复制上一阶段构建打包好的静态包（dist）到nginx服务的静态文件存放目录下
COPY --from=builder /code/build   /usr/share/nginx/html
