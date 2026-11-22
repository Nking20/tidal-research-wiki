---
title: 毒马铃薯地区
---

# 毒马铃薯地区

土豆地区在 **旧世界** 的地表。主世界没有这些群系，废墟里的马铃薯底座也不会开启另一个维度。内容取自 Mojang 的 [2024 年愚人节快照](https://www.minecraft.net/en-us/article/poisonous-potato-update)，下面写的是 Relict 里的实际玩法。

## 群系和建筑

| 看到什么 | 群系 ID |
| --- | --- |
| 毒马铃薯田野 | `relict:potato_fields` |
| 马铃薯植物园 | `relict:potato_arboretum` |
| 马铃薯腐败区 | `relict:potato_corruption` |
| 薯饼荒地 | `relict:potato_hash` |
| 马铃薯废土 | `relict:potato_wasteland` |

| 建筑 | 进去找什么 | ID |
| --- | --- | --- |
| 马铃薯村庄 | 农田、村民和补给箱 | `relict:potato_village` |
| 马铃薯矿井 | 补给箱、薯蝠和经典洞穴蜘蛛刷怪笼 | `relict:potato_mineshaft` |
| 马铃薯传送门废墟 | 底座和箱子；底座无法激活 | `relict:ruined_portatol` |
| 马铃薯竞技场 | 薯巨头和战利品 | `relict:potato_colosseum` |

生存模式下，在任意旧世界地点右键**马铃薯之眼**，它会朝竞技场飞去。一次成功投掷消耗一颗。命令权限玩家也可以直接查：

```mcfunction
/execute in relict:old_world run locate biome relict:potato_fields
/execute in relict:old_world run locate structure relict:potato_village
/execute in relict:old_world run locate structure relict:potato_mineshaft
/execute in relict:old_world run locate structure relict:ruined_portatol
/execute in relict:old_world run locate structure relict:potato_colosseum
```

## 下矿和交易

启用本地历史资源包后，毒马铃薯 `relict:poisonous_potato` 会显示 Java 版 1.7.10 的原版图标。1.6.4 使用同一张图。

- 旧世界的成熟土豆约有 **2%** 概率额外掉一颗毒马铃薯。土豆地区也可从矿石、箱子和怪物身上找。
- 马铃薯石及其铜、铁、金、青金石、红石、钻石变种用**锄**挖。普通马铃薯石掉薯岩。毒马铃薯矿石和彩色薯皮块用**镐**。
- 采到毒树脂后，把树脂拿在主手、羽毛放副手，在土豆群系里右键制箭台。每次加工提高一档，最高档再加工会得到琥珀宝石。羽毛不消耗。
- 标记为土豆村民的村民用琥珀宝石代替绿宝石收款；玩家向他们出售东西，原本给绿宝石的交易改付毒马铃薯。
- 当地自然刷出的原有物种使用旧世界版本，如旧骷髅、经典蜘蛛和旧牛羊。毒马铃薯僵尸、薯蝠、毒鳍按各自群系生成。马铃薯废土下雨或碰水时要留意中毒。

## 马铃薯钩索

在旧世界瞄准方块右键，钩索会在准星对准的位置挂上，最远 48 格。命中消耗一点耐久，空钩不消耗。靠近后会减速并松开，也可以再按一次右键或换走钩索提前松开。松开后仍会正常下落。

## 薯巨头怎么打

进竞技场后靠近中央，难度不能是和平。薯巨头掉到下一段血量时会缩小并开盾，**先清掉它叫来的那一波**，盾才会解除。第 8 波是恶魂，第 9 波在水里打瘟疫鲸，第 10 波是旧巨人。带弓和足够的箭，别一直站在水池里。

十波打完后再击杀薯巨头，玩家可获得大法杖和纪念章。法杖在土豆群系右键可短暂浮空，随后缓降，冷却 20 秒；对堆肥桶右键可解锁对应进度。

## 马铃薯削皮器

用削皮器右键草皮顶面，可以削出对应颜色的薯皮。对毒马铃薯块使用时，会削出九颗毒马铃薯。
