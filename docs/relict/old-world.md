---
title: 旧世界探索
sidebar_position: 3
---

# 旧世界探索

旧世界 `relict:old_world` 的方块高度为 Y=0～127，海平面为 Y=63。维度有自己的地形、雾、光照和音乐。要找建筑、地下宝箱或刷怪点，请查[遗迹与战利品](./structures.md)。

## 十种群系

| 群系 | 注册 ID | 探索线索 |
| --- | --- | --- |
| 旧海洋 | `relict:old_ocean` | 横渡时可用经典船，单人乘坐。 |
| 旧平原 | `relict:old_plains` | 适合建立回程点，开阔地有利于发现村庄和地表建筑。 |
| 旧沙漠 | `relict:old_desert` | 寻找沙漠神殿，进塔前准备挖掘工具。 |
| 旧山脉 | `relict:old_mountains` | 红龙可能出没，山地落差大。 |
| 旧森林 | `relict:old_forest` | 可采橡木，也可能遇到经典狼。 |
| 旧白桦林 | `relict:old_birch_forest` | 白桦原木用于林木收集进度，也有经典狼。 |
| 旧雪原 | `relict:old_snowy_plains` | 留意冰术师施法前的落冰预警。 |
| 旧河流 | `relict:old_river` | 可以沿河探索或当作返程地标。 |
| 雨林 | `relict:rainforest` | 保留旧式橡树生态，有独立到访进度。 |
| 经典丛林 | `relict:classic_jungle` | 可找丛林木、藤蔓、可可、西瓜和丛林神庙。 |

雨林与经典丛林分别计入[旧世界进度](./progression.md)。要完成「同样潮湿，不同年代」，两处都要到访。

## 坐标墙与边境之地

旧界复刻了沿 X、Z 轴延伸的黑曜石坐标墙。默认墙体的生成范围从原点向两侧延伸约 512 格。沿 X 或 Z 任一方向走到绝对坐标约 8192 格，可以见到边境之地地形。两项距离均可由[维度生成器设置](./compatibility.md#自定义旧世界地形)调整。

## 乘船

用五块旧界木板按船的形状合成经典船。它只载一人，高速撞上障碍或跌落超过 3 格时会损坏。允许实体掉落时，撞毁会留下三块旧橡木木板和两根木棍。经过浅滩、急弯或瀑布前可以提前下船。

## 用指令定位

有命令权限的玩家可以从任意维度执行以下命令。把最后的 ID 换成表中的其他群系，或换成[遗迹表](./structures.md#结构一览)中的结构。

```mcfunction
/execute in relict:old_world run locate biome relict:classic_jungle
/execute in relict:old_world run locate structure relict:classic_jungle_temple
```
