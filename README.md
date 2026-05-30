# また

个人封面首页，签名是 `どこかで、また。`。这是纯静态站点，可以直接部署到 GitHub Pages。

当前绑定域名：`mata.city`

## 部署到 GitHub Pages

1. 把本目录推送到你的 GitHub 仓库。
2. 在仓库 `Settings -> Pages` 中选择 `Deploy from a branch`。
3. Branch 选择 `main`，目录选择 `/root`，保存。
4. 如果要绑定阿里云万网域名，在仓库根目录新增 `CNAME` 文件，内容只写你的域名：

```txt
mata.city
```

5. 到阿里云 DNS 解析里添加 GitHub Pages 要求的记录。

根域名 `mata.city`：

| 类型 | 主机记录 | 记录值 |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

可选 IPv6：

| 类型 | 主机记录 | 记录值 |
| --- | --- | --- |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |

`www` 子域名：

| 类型 | 主机记录 | 记录值 |
| --- | --- | --- |
| CNAME | www | `<你的 GitHub 用户名>.github.io` |

GitHub 建议先在仓库 `Settings -> Pages -> Custom domain` 添加域名，再配置 DNS；DNS 生效可能需要最长 24 小时。不要添加 `*.example.com` 这种泛解析记录。

## 文件

- `index.html`: 首页结构
- `styles.css`: 视觉样式和响应式布局
- `assets/mata-hero.png`: 首页主视觉图
