---
title: 魔改样例
---

# 魔改样例

## KubeJS 任务文件

```text
kubejs/data/my_pack/tidal_commission_tasks/my_factory/my_factory_t1_parts_01.json
```

## KubeJS 阶段脚本

```js
PlayerEvents.advancement(event => {
  if (event.advancement.id === 'minecraft:story/mine_diamond') {
    event.server.runCommandSilent(`tc stage add ${event.player.username} steel_age`)
  }
})
```

## 数据包目录

```text
datapacks/my_pack/
├─ pack.mcmeta
└─ data/
   └─ my_pack/
      └─ tidal_commission_tasks/
         └─ my_factory/
            └─ my_factory_t1_parts_01.json
```

更新已有服务器的任务时，优先改 `config/tidalcommission/tasks/`，然后运行：

```text
/tc reload
/tc doctor
```
