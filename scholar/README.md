# 爬取学者信息

本模板利用大语言模型解析当前网页，把学者信息转换为 Markdown 格式，并自动导入到 Obsidian 中。

适配最新版 [PaperBell](https://github.com/SongshGeo/Obsidian-PaperBell) 示例库，可以自动完成收藏学者、创建其机构笔记、关联该学者论文的功能。详细效果可参看 [PaperBell 文档](https://paperbell.songshgeo.com/)。

## 开始使用

下载 [scholar-clipper.json](./scholar-clipper.json) 文件，并将其添加到 Obsidian Web Clipper 插件的模板中。

![导入模板](https://songshgeo-picgo-1302043007.cos.ap-beijing.myqcloud.com/uPic/CleanShot%202025-02-01%20at%2018.58.58@2x.png)

由于本模板应用了大模型解析，所以需要手动配置模型，详细配置方法请参考[官方文档](https://help.obsidian.md/web-clipper/interpreter)：

![配置大模型解析](https://songshgeo-picgo-1302043007.cos.ap-beijing.myqcloud.com/uPic/CleanShot%202025-02-01%20at%2019.03.34@2x.png)

调整模板顺序到默认模板之后，因为该模板会针对学者主页自动激活。

![调整模板顺序](https://songshgeo-picgo-1302043007.cos.ap-beijing.myqcloud.com/uPic/CleanShot%202025-02-01%20at%2019.02.17@2x.png)

## 支持的网站

自动识别是否为学者主页，如果是则自动激活该模板。该模板在以下网站测试通过：

- Google Scholar
- ResearchGate
- 北京师范大学、中山大学、马普所的学者主页

如果你发现该模板在其他网站上无法正常工作，请在 [Issue](https://github.com/SongshGeo/Obsidian-PaperBell/issues) 中反馈。
