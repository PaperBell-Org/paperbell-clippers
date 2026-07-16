# 剪藏豆瓣读书 / 电影

本目录有两个模板，把豆瓣的书籍或电影条目剪藏成 Obsidian 笔记：

- [douban-book-clipper.json](./douban-book-clipper.json) —— 豆瓣读书
- [douban-movie-clipper.json](./douban-movie-clipper.json) —— 豆瓣电影

两者都从页面的结构化数据（schema.org）和 `og:` 元信息里直接取值，**不需要配置大模型**，剪藏是纯解析、无 API 开销。

## 运行前提

比学者模板轻得多，正文为空，只写 frontmatter，所以对插件几乎没有依赖。请确保：

- 笔记默认保存路径为 `20 - Inputs`——本仓库所有模板都剪藏到这里，也就是 PaperBell 默认监视的 `watchFolder`，再由「按 frontmatter 移动」根据 `input_type` / `tags` 归档到位。如需改动可调整模板的 `path` 字段，但把它挪出 `watchFolder` 会导致剪藏的笔记不再被后处理。
- `banner` / `banner_icon` 字段供支持横幅的主题或插件（如 Banners）使用；没装也不影响，只是多两个用不上的 frontmatter 字段。

## Frontmatter 字段（schema）

两个模板共享同一套骨架，只有条目专属字段不同。`input_type` 是区分两者的判别字段（`book` / `movie`）。

### 共有字段

| 字段 | 类型 | 来源 | 说明 |
| --- | --- | --- | --- |
| `name` | text | `og:title` | 条目标题，与文件标题一致 |
| `title` | text | `og:title` | 同上 |
| `input_type` | text | 固定 | `book` / `movie`，归档时据此分流 |
| `cover` | text | `og:image` | 封面图；用 `replace` 过滤器把豆瓣的缩略图地址换成大图 |
| `tags` | list | 固定 | 读书为 `reading, clippings`；电影为 `movie, clippings` |
| `keywords` | list | LLM/schema | 读书留空待补；电影取 `@Movie:genre` |
| `source` | text | `{{url}}` | 来源链接 |
| `douban_url` | text | `{{url}}` | 豆瓣条目链接 |
| `rating` | text | schema | 豆瓣评分（`aggregateRating.ratingValue`） |
| `banner` | text | `og:image` | 横幅图，同 `cover` |
| `banner_icon` | text | 固定 | 读书 📚 / 电影 🎬 |
| `date` | text | `{{date}}` | 建档日期 |
| `captured` | text | `{{date}}` | 剪藏日期 |
| `star` | text | 手动 | 个人评分，剪藏时留空 |

### 读书专属

| 字段 | 类型 | 来源 | 说明 |
| --- | --- | --- | --- |
| `author` | list | `@Book:author[*].name` | 作者 |
| `isbn` | text | `@Book:isbn` | ISBN |
| `publish` | text | `@Book:publisher` | 出版社 |
| `pagecount` | text | `@Book:numberOfPages` | 页数 |

### 电影专属

| 字段 | 类型 | 来源 | 说明 |
| --- | --- | --- | --- |
| `director` | list | `@Movie:director[*].name` | 导演 |
| `genre` | list | `@Movie:genre` | 类型 |
| `year` | text | `@Movie:datePublished` | 上映日期 |
| `runtime` | text | CSS 选择器 | 片长；豆瓣未放进 schema，靠 `span[property="v:runtime"]` 取 |

## 开始使用

下载对应的 `.json` 文件，添加到 Obsidian Web Clipper 插件的模板中即可。无需配置大模型。

## 支持的网站

| 模板 | 自动激活的页面 |
| --- | --- |
| 豆瓣读书 | `https://book.douban.com/subject/` 开头的条目页 |
| 豆瓣电影 | `https://movie.douban.com/subject/` 开头的条目页 |

两个模板都用 URL 前缀触发，只在条目详情页激活，豆瓣的搜索页、书单页不会触发。

如果你发现模板无法正常工作，请在 [Issue](https://github.com/SongshGeo/Obsidian-PaperBell/issues) 中反馈。
