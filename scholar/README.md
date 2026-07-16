# 爬取学者信息

本模板利用大语言模型解析当前网页，把学者信息转换为 Markdown 格式，并自动导入到 Obsidian 中。

适配最新版 [PaperBell](https://github.com/SongshGeo/Obsidian-PaperBell) 示例库，可以自动完成收藏学者、创建其机构笔记、关联该学者论文的功能。详细效果可参看 [PaperBell 文档](https://paperbell.songshgeo.com/)。

## 运行前提

本模板生成的笔记正文（`noteContentFormat`）依赖特定的 Obsidian 插件与库结构，**直接导入到未配置的库中会出现渲染错误或空白块**。请确保：

- 已安装 [PaperBell](https://github.com/SongshGeo/Obsidian-PaperBell) 示例库，或参照其结构。
- 已启用以下插件/功能：
  - **Callout（`ad-flex`）** —— 用于「基本信息」区的两栏布局。
  - **Dataview**（需开启 JavaScript 查询）—— 「最新动态」区使用 `dataviewjs` 扫描日记；其中日记路径 `00 - 每日日记/DailyNote` 为硬编码，请按你的库结构修改。
  - **Bases** —— 「相关论文」区通过 `![[论文检索.base]]` 嵌入，需要库中存在该 base 文件。
  - **Callout（`update` 类型）** —— 「动态日志」区用 `> [!update]` 记录学者的外部更新。
- 笔记默认保存路径为 `Inputs`——本仓库所有模板都剪藏到这里，也就是 PaperBell 默认监视的 `watchFolder`，再由「按 frontmatter 移动」根据 `scholar` 标签归档到位。如需改动可调整模板的 `path` 字段，但把它挪出 `watchFolder` 会导致剪藏的笔记不再被后处理。
- 正文含一个指向 `[[学者刷新工作流]]` 的库内链接（记录动态刷新约定），未建该笔记时链接为空链，不影响其他内容。

## Frontmatter 字段（schema）

> 本表是学者 schema 的**单一事实锚点**。该 schema 在 3 处并存、需保持一致：本 Web Clipper 模板（新学者主入口，LLM 自动填充）、库内 Templater 模板 `学者模板.md`（手动建档）、以及消费端 `Persons/00. 学者列表.base` 与各概念笔记的 dataviewjs。改字段时照本表同步这 3 处。

| 字段 | 类型 | 来源 | 说明 |
| --- | --- | --- | --- |
| `name` | text | LLM | 学者姓名，与文件标题一致 |
| `aliases` | list | 手动 | 别名 |
| `gender` | text | LLM | `男`/`女`/`male`/`female` |
| `birthday` | text | 手动 | 生日 |
| `email` | list | LLM | 邮箱 |
| `title` | list | LLM | 职称 |
| `website` | text | `{{url}}` | 主页链接 |
| `photo` | text | LLM | 头像图片地址 |
| `tags` | list | 固定 | `scholar, clippings` |
| `institute` | list | LLM | 机构数组，**当前机构 = `institute[0]`**；职位变动时把新机构追加到数组开头 |
| `following_date` | text | `{{date}}` | 建档日期 |
| `keywords` | list | LLM | 研究兴趣宽泛标签（概念端按 keyword 反查到本学者） |
| `country` | text | LLM | 国家/地区（按机构国家视图用） |
| `roles` | list | 手动/工作流 | 用途受控词表：潜在合作者 / 潜在审稿人 / 会议联系人 / 学术偶像 / 同行（clip 时故意留空） |
| `updated` | text | `{{date}}` | 最近一次刷新该档案的日期 |
| `last_checked` | text | `{{date}}` | 最近一次检查外部动态的日期（「按新鲜度」视图据此升序） |
| `link_status` | list | 工作流 | 链接体检结果，健康时留空；失效时记 `<字段> <错误码>`（如 `website 404`） |

`concepts`（指向 `Cards/Concepts` 的研究概念链接）不在 clip 时生成，改由刷新工作流对照受控词表兜底补全。

## 开始使用

下载 [scholar-clipper.json](./scholar-clipper.json) 文件，并将其添加到 Obsidian Web Clipper 插件的模板中。

![导入模板](https://songshgeo-picgo-1302043007.cos.ap-beijing.myqcloud.com/uPic/CleanShot%202025-02-01%20at%2018.58.58@2x.png)

由于本模板应用了大模型解析，所以需要手动配置模型，详细配置方法请参考[官方文档](https://help.obsidian.md/web-clipper/interpreter)：

![配置大模型解析](https://songshgeo-picgo-1302043007.cos.ap-beijing.myqcloud.com/uPic/CleanShot%202025-02-01%20at%2019.03.34@2x.png)

调整模板顺序到默认模板之后，因为该模板会针对学者主页自动激活。

![调整模板顺序](https://songshgeo-picgo-1302043007.cos.ap-beijing.myqcloud.com/uPic/CleanShot%202025-02-01%20at%2019.02.17@2x.png)

## 支持的网站

以下网站的学者主页会**自动激活**本模板：

| 类别 | 站点 |
| --- | --- |
| 学术档案 | Google Scholar 个人主页（多域名：`.com` / `.co.uk` / `.com.hk` 等）、ORCID、ResearchGate、Semantic Scholar、Academia.edu |
| 文献数据库 | Scopus、Web of Science、dblp、OpenAlex、My NCBI |
| 中文平台 | AMiner、X-MOL |
| 其他 | Frontiers Loop、IDEAS/RePEc、ScholarGPS |
| 机构主页 | 域名为 `.edu` / `.edu.xx` / `.ac.xx` / `.mpg.de`，且路径含 `people` / `faculty` / `staff` / `teacher` / `szdw` 等成员目录层级（如中山大学 `science.sysu.edu.cn/teacher/...`、马普所 `bgc-jena.mpg.de/en/bgi/people`） |
| Pure 门户 | 欧洲高校常用的 Elsevier Pure 研究门户，形如 `research.rug.nl/en/persons/...`、`pure.au.dk/portal/en/persons/...` |

**手动选择同样有效。** 触发规则只决定模板是否*自动*弹出；在 Web Clipper 中手动选中本模板，在任何页面上都能正常工作。部分机构主页的 URL 里不含任何可识别的成员目录层级（如北京师范大学的 `geot.bnu.edu.cn/Public/htm/news/5/<id>.html`），无法自动激活，手动选择即可。

另有两点已知限制：触发匹配**大小写敏感**（`/People/` 不会命中）；非 `.edu` / `.ac.xx` 域名的高校主页（如 `uni-heidelberg.de`）也不在兜底范围内——收窄到学术域名是为了避免在普通网页上误触发。

如果你发现该模板在其他网站上无法正常工作，请在 [Issue](https://github.com/SongshGeo/Obsidian-PaperBell/issues) 中反馈。
