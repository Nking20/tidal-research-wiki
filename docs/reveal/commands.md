---
sidebar_position: 5
title: 命令与编辑器
---

# 命令与编辑器

所有命令以 `/reveal` 开头。除查看自己的进度外，管理命令需要权限等级 2。

## 进度管理

```mcfunction
# 查看自己的进度
/reveal progress

# 查看指定玩家的进度（权限 2）
/reveal progress <玩家>

# 为执行者解锁或移除一个类别中的全部条目
/reveal add <类别 ID>
/reveal remove <类别 ID>

# 为执行者解锁或移除指定条目
/reveal add <类别 ID> <条目 ID>
/reveal remove <类别 ID> <条目 ID>

# 为指定玩家解锁或移除指定条目
/reveal add <类别 ID> <条目 ID> <玩家>
/reveal remove <类别 ID> <条目 ID> <玩家>

# 为执行者或指定玩家解锁/移除全部内容
/reveal add all
/reveal remove all
/reveal add all <玩家>
/reveal remove all <玩家>
```

类别整批操作没有目标玩家参数；如需修改其他玩家，可使用 `all <玩家>`，或逐条使用 `<类别 ID> <条目 ID> <玩家>`。

示例：

```mcfunction
/reveal add creeper_secret record_13 @s
/reveal remove all PlayerName
```

## 内容维护

```mcfunction
# 重载主配置和 config/reveal/entries/ 下的条目
/reveal reload

# 导出内置默认条目，不覆盖已经存在的文件
/reveal export-defaults

# 打开可视化编辑器
/reveal editor

# 诊断配置、物品、标签、类别与条目引用
/reveal doctor
```

`/reveal editor` 只能由玩家执行。服务器中要求权限等级 2；单人世界中允许本地玩家使用。

## 可视化编辑器

编辑器有三个页签：

| 页签 | 可维护内容 |
| --- | --- |
| 类别 | 类别 ID、显示名、图标、隐藏状态、初始解锁数、经验奖励。 |
| 条目 | 类别、条目 ID、标题、图标、权重、排序、经验奖励和多行正文。 |
| 解锁 | 解锁类型、目标篇章或指定辑录、条件、材料消耗方式和提示位置。 |

“解锁”页支持材料揭秘、击杀生物、进入群系和完成进度。物品、生物、群系与进度都可以通过搜索选择器填写；“手持填入”按钮已经移除。保存类别或解锁方式会写回 `config/reveal/reveal.json`；保存条目会写入 `config/reveal/entries/`。保存后会立即重载内容，并保留当前正在编辑的对象。

:::warning
可视化编辑器的条目页面向单页纯文本内容。它只读取第一数据页的正文，保存时也会写成单个文本页。包含多页或 `image` 的条目应直接编辑 JSON，避免通过编辑器保存后丢失后续页面或图片字段。
:::

## `/reveal doctor` 会检查什么

- 没有条目的类别或没有类别的条目；
- 解锁方式引用了不存在或空的篇章；
- 解锁方式指定了不存在的目标辑录；
- 不同材料解锁方式使用了相同材料条件；
- 物品 ID、类别图标不存在；
- 标签不存在或标签为空；
- 隐藏类别却设置了初始解锁数；
- 完全没有篇章、解锁方式或条目的配置。

在发布整合包前执行一次 `/reveal doctor`，能提前发现绝大部分拼写与引用问题。
