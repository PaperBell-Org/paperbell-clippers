# PaperBell Clipper Templates

English | [简体中文](README-zh.md)

This repository is officially supported by [PaperBell](https://github.com/SongshGeo/Obsidian-PaperBell), and stores templates for the [Obsidian Web Clipper](https://github.com/obsidianmd/obsidian-clipper).

To install a template, see the official [Obsidian Web Clipper documentation](https://help.obsidian.md/web-clipper/templates).

## Templates

- [Scholar](scholar/README.md) — clip a scholar's profile and import it into PaperBell.
- [Douban](douban/README.md) — clip a Douban book or movie entry into PaperBell.

Most templates clip into `20 - Inputs`, the folder PaperBell watches, and are filed from there by frontmatter. The scholar template is the exception: it writes straight to `30 - Metadata/Scholars`, because frontmatter routing would file it under `20 - Inputs/Clippings` instead.

## Contribution

If you want to contribute to this repository, please follow these steps:

1. Fork this repository
2. Create a new folder in the repository root (one folder per template)
3. Add your template `.json` and a `README.md` file to the folder
4. Create a pull request
