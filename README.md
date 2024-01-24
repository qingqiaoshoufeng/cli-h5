# CLI-H5

🛠️ CLI-H5 脚手架

## 开发

### 1. 脚手架脚本开发

主要是通过 `/bin` 里面的脚本，远程`git`拷贝和修改 `/template` 的代码以完成项目初始化

### 2. 核心模板联调

#### a. 联调准备

`/template` 为工程模板地址，里面依赖[template(框架核心模板)](http://10.10.3.188:9090/castle/template-h5)，所以开发的时候需要用使用 [yalc](https://github.com/wclr/yalc) 来完成类似 `npm link` 的操作。

1. 安装 yalc

```bash
npm i yalc -g
# or
yarn global add yalc
```

2. yalc publish (发布依赖)

在 [template(框架核心模板)](http://10.10.3.188:9090/castle/template-h5) 中执行：

```bash
yalc publish
```

3. yalc add (添加依赖)

在 `/template` 下执行：

```bash
yalc add @castle/template-h5
```

4. yalc push (更新和推送)

开发过程中需要更新 [template(框架核心模板)](http://10.10.3.188:9090/castle/template-h5) ：

```bash
yalc push
```

5. yalc remove (移除依赖)

如果需要移除：
```bash
yalc remove @castle/template-h5
```

#### b. 联调

在 `/template` 下执行：

```bash
yarn dev
```
