---
title: 虚拟货币与兼容 API
---

# 虚拟货币与兼容 API

潮汐观测卡 1.2.0 起可以直接把实体物品、VSS 虚拟货币、FTB Library 当前启用的货币，或其他模组注册的账户货币用于观测和兑换。虚拟货币仍由原模组保存，TRS 只在服务端读取余额并完成扣款，不需要把货币转换成背包物品。

## 使用 VSS 虚拟货币

安装 ViScriptShop 后，在服务端的 `config/trs/tidal_levels.json5` 中定义一个货币别名：

```json5
{
  "currencies": {
    "vss_money": {
      "type": "external",
      "provider": "viscript_shop",
      "currency": "money"
    }
  },
  "levels": {
    "1": {
      "observe_currency": "vss_money",
      "observe_cost": 2,
      "redeem_currency": "vss_money"
    }
  }
}
```

其余等级可以继续引用同一个 `vss_money`。也可以直接把等级中的货币写成：

```json5
"observe_currency": "viscript_shop:money",
"redeem_currency": "viscript_shop:money"
```

玩家观测或兑换时，TRS 会直接检查并扣除 VSS 账户余额。VSS 未安装或接口不可用时，该货币余额会被视为 0。

修改后执行：

```text
/trs reload
/trs doctor
```

服务器配置具有最终决定权，客户端不需要单独维护一份 VSS 货币配置。

## 使用 FTB Library 货币

如果整合包使用 FTB Library 提供的当前货币账户，可以这样配置：

```json5
"currencies": {
  "ftb_money": {
    "type": "external",
    "provider": "trs:ftb_library",
    "currency": "ftblibrary:active_currency"
  }
}
```

随后把等级中的 `observe_currency` 或 `redeem_currency` 写成 `ftb_money`。TRS 会使用 FTB Library 当前有效的 CurrencyProvider。

## 接入其他模组的货币

第三方模组可以实现 `com.trs.api.currency.CurrencyProvider`，再向 TRS 注册 Provider。最小实现如下：

```java
public final class MyCurrencyProvider implements CurrencyProvider {
    private static final ResourceLocation PROVIDER =
            ResourceLocation.fromNamespaceAndPath("example", "account");

    @Override
    public ResourceLocation id() {
        return PROVIDER;
    }

    @Override
    public String displayTranslationKey(ResourceLocation currencyId) {
        return "currency.example.coin";
    }

    @Override
    public int balance(ServerPlayer player, ResourceLocation currencyId) {
        return ExampleAccounts.balance(player.getUUID());
    }

    @Override
    public boolean consume(ServerPlayer player, ResourceLocation currencyId, int amount) {
        return ExampleAccounts.tryConsume(player.getUUID(), amount);
    }
}
```

直接注册：

```java
TidalCurrencyApi.registerProvider(new MyCurrencyProvider());
```

也可以通过 NeoForge IMC 注册，避免直接调用注册方法：

```java
InterModComms.sendTo(
        "trs",
        TidalCurrencyApi.IMC_REGISTER_PROVIDER,
        MyCurrencyProvider::new
);
```

配置中引用该 Provider：

```json5
"currencies": {
  "example_coin": {
    "type": "external",
    "provider": "example:account",
    "currency": "example:coin"
  }
}
```

Provider ID 必须唯一。`balance`、`consume` 和可选的 `grant` 都会在服务端线程调用；`consume` 应只在能够完整扣除请求数量时返回 `true`，不要执行部分扣款。Provider 还可以实现 `displayIcon`、`canGrant` 和 `grant`，供货币奖励与界面显示使用。

## 常见问题

### 界面显示余额不足

先确认服务端已安装对应货币模组，并检查 Provider 和货币 ID。修改配置后执行 `/trs reload`，再用 `/trs doctor` 检查配置。

### 能否同时使用物品货币和虚拟货币

可以。不同观测等级可以引用不同货币；实体物品货币仍可以直接写 `minecraft:gold_ingot` 等物品 ID，也可以在 `currencies` 中定义为 `type: "item"` 的别名。

### 是否需要潮汐荷包

不需要。VSS、FTB 和第三方账户余额由对应模组保存，TRS 会直接调用货币 Provider。
