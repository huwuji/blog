## 关于mac intel 使用Stable Diffusion WebUI库启动项目是遇到问题

### AI 自动生成图片安装python问题处理

```
active the venv: source ./venv/bin/activate
run pip uninstall opencv_python , it will remind you uninstall both opencv_python and cv2, chose yes
pip install opencv_python==4.5.5.64

webui-macos-env. sh文件配置 export COMMANDLINE_ARGS="--skip-torch-cuda-test --upcast-sampling --no-half-vae --no-half  --disable-nan-check --use-cpu interrogate"
```

然后直接执行

```
cd ~/stable-diffusion-webui
./webui.sh

```

执行后浏览器进入<http://127.0.0.1:7860>

> [Stable Diffusion web UI 仓库](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
> 参考安装配置地址：<https://ivonblog.com/posts/stable-diffusion-webui-macos-installation/>
