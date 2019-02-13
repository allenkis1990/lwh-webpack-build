###1 npm run dev -- --project=project1 如果不带project参数默认取主项目文件夹下的第一个项目
###2 npm run pro -- --project=project1 如果不带project参数默认构建主项目文件夹下的第一个项目
###3 npm run build不需要带任何参数 构建主文件夹下的所有主项目
###4 npm run replace不需要手动去运行这个指令 因为会通过build-all.js这个文件动态修改package.json replace指令