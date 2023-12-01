# Library Management System

图书管理系统，db 课大作业。

Github Repo: <https://github.com/lnkkerst/library-management-system-db-course-nuxt>

Live Demo: <https://db-lib.course.lnkkerst.me/>

## 环境配置

确保安装好 Node.js 相关环境，并且启用 `corepack`。

```bash
node -v
corepack enable
```

1. 安装依赖

```bash
pnpm i
```

2. 修改环境变量，参照 `.env.example` 文件

```
DATABASE_URL="sqlserver://example.com:1433;database=library_management_system;user=sa;password=xxx"
JWT_SECRET="114514"
```

其中 `DATABASE_URL` 变量为 Prisma 风格的数据库连接字符串，`JWT_SECRET` 是 JWT 鉴权用的密钥

3. 配置数据库

详见 <https://www.prisma.io/>

```bash
#pnpm prisma migrate deploy
pnpm prisma migrate reset
```

## 开发

```bash
pnpm run dev
```

## 构建

```bash
pnpm run build
```

## 参考

- [Nuxt](https://nuxt.com/)
