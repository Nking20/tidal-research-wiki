---
title: 旧世界探索
sidebar_position: 3
---

# 旧世界探索

旧世界 `relict:old_world` 的方块高度为 Y=0 至 Y=127，海平面为 Y=63。平原、森林、白桦林、沙漠、山脉、雪原、海洋、河流、雨林和经典丛林构成十种群系。雨林与经典丛林各有自己的群系 ID。经典丛林可以找到丛林树、藤蔓、可可、西瓜和丛林神庙。

世界保留旧式的雾、光照、音乐与地形。靠近原点可以看到沿坐标轴延伸的黑曜石墙。默认配置下，远离原点至 X 或 Z 的绝对值约 8192 格时，可以遇到边境之地。

## 建筑与遗迹

| 去哪里 | 可以找到什么 | 结构 ID |
| --- | --- | --- |
| 旧村庄 | 民居、农田、铁匠铺与村庄守卫 | `relict:old_village` |
| 废弃矿井 | 旧木支架、战利品矿车、洞穴蜘蛛刷怪点，可能遇到淘气鬼 | `relict:old_mineshaft` |
| 旧屋与破旧屋子 | 旧式陈设、补给与早期人形生物 | `relict:old_house`、`relict:abandoned_house` |
| 农舍 | 木顶农舍和石砌田园小屋有各自的农田、补给和居民 | `relict:timber_farmhouse`、`relict:stone_farmhouse` |
| 幽居小屋 | 可能遇到一至两名黑面史蒂夫 | `relict:shadow_lodge` |
| 沙漠神殿 | 压力板、TNT 陷阱和地下宝箱 | `relict:old_desert_temple` |
| 丛林神庙 | 绊线发射器、拉杆机关和隐藏宝箱 | `relict:classic_jungle_temple` |
| 要塞 | 石砖地牢、末地传送门房间及玻璃柱地标 | `relict:old_stronghold` |
| 砖块金字塔 | 砖砌阶梯外形及固定网格坐标 | `relict:brick_pyramid` |
| 石塔与苔石坟墓 | 旧界地表地标 | `relict:old_stone_tower`、`relict:old_grave` |

旧地牢是在地下生成的特征，可以找到旧式刷怪笼和补给箱。想用管理员命令定位时，请在旧世界执行，或在指令中指定维度。

```mcfunction
/execute in relict:old_world run locate biome relict:classic_jungle
/execute in relict:old_world run locate structure relict:classic_jungle_temple
```

## 旧世界进度

获得照片或进入旧世界后，可以在原版进度界面查看独立页签。42 项进度涵盖往返、工具和材料、树木和农作物、遗迹探索、生物互动及历史遗物。
