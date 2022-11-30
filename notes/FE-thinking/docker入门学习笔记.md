## Docker 入门笔记整理

### 一. 什么是 Docker

能在通硬件与 OS 的机器上运行不同 OS 层面要求的应用程序。程序之间相互隔离，与虚拟机相比，有更轻便的体积，以及更高效的系统资源利用；

### 二. 优势

- 一致的运行环境，安全的应用隔离；
- 更便捷的维护和扩展；
- 方便持续的部署和交付；
- 更快速的启动；
- 更高效的资源利用；

### 三. 基本概念

- 镜像 Image
- 容器 Container
- 仓库 Repository

1.  镜像：**静态的**
    首先镜像是一个文件对象（文件系统）--及一种**特殊的文件对象**；

    - 包含了 OS 文件系统：提供容器运行时所需要的库、资源、配置等；
    - 包含了应用的文件对象；

    镜像的架构设计（分层架构）--- 分层存储，及由**多层文件**联合组成；
    **镜像的构建是一层层的构建，已经构建的层没有变化，后一层的构建也不会影响前一层；**

2.  容器：**动态的**
    容器是镜像的运行环境；

    - 理解：  
      **从编程角度：镜像可以比作类（Class）,容器就是镜像的实例；容器可以被创建，启动，停止，暂停，删除等**

    - 容器的结构：
      以镜像为基础层，在其外层创建一或多层文件，及当前容器的**存储层**

    - 容器存储层的生命周期：
      **存储层的生命周期跟随容器创建和消亡；**
      所以不应该在同期存储层写入数据，应该使用**数据卷或绑定宿主目录**；
      （我们在 docker 部署前端静态资源时，关于 nginx 的 conf 配置如上说设置）

3.  仓库：
    及镜像的远程存储服务器，集中存储，分发镜像，同比 github；
    形式如<仓库名>:<标签>--->node:alpine

### 四. 一些具体操作指令

1.  镜像---指令：

    - 查找镜像：
      ```
      docker search node/<name>
      ```

    输出结构：
    NAME: 名称
    DESCRIPTION: 描述
    OFFICIAL: 是否官方
    AUTOMATED: 自动构建
    ...

    - 获取镜像

    ```
    docker pull <repository>:<tag>
    ```

    **补充：从镜像的拉取 log 我们也可以看出，镜像时一层层文件单独的下载，已经被其他镜像下载过的某层文件，不会重复下载**

    - 列出本地已下载镜像：

      ```
      docker image ls ｜ docker image ls node
      ```

    - 删除镜像：

    ```
        docker image rm [选项] <镜像1> <镜像2> ...
        // 或
        docker rmi [image] <image1>
        // <镜像1>可以是镜像短ID，镜像名，镜像摘要等
    ```

    - 构建镜像（本地镜像构建）

      - 第一步：编写 Dockerfile 脚本文件，利用本地的 Dockerfile 文件构建。这里要了解怎么编写 Dockerfile 脚本文件；
      - 第二部：执行 docker 构建命令

      ```
          docker build [选项] <上下文路径>
          // 如
          docker build -t image-name .
          // 注意这里有个.
      ```

      **这个是表明是在当前命令的上下文目录下，查找 Dockerfile 文件，创建一个名文 image-name 的镜像；**

    - 补充 Dockerfile 文件编写的常用指令
      - FROM node:alpine as builder ---指定一个基本镜像
      - ENV NODE_ENV production ---设置环境变量
      - WORKDIR /code ---创建工作目录
      - ADD yarn.lock package.json /code ---往工作目录中添加文件
      - RUN yarn build ---运行指令，可以多次执行
      - EXPORT 8000 ---设置端口
      - CMD yarn start ---执行命令，**只能使用一次**
      - COPY --from=builder /code/build /usr/share/nginx/html ---**复制上一阶段构建打包好的静态包（dist）到 nginx 服务的静态文件存放目录下**

2.  容器指令操作：

--- todo--
