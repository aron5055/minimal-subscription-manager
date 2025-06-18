# 模拟订阅数据使用指南

## 概述

这个项目包含了一套完整的模拟订阅数据，用于开发和测试。数据包含了12个不同的订阅服务和6个分类。

## 包含的模拟数据

### 分类 (Categories)
- 娱乐 (Entertainment)
- 生产力 (Productivity) 
- 新闻资讯 (News)
- 云服务 (Cloud)
- 开发工具 (Development)
- 健康健身 (Health)

### 订阅服务 (Subscriptions)
1. **Netflix** - $15.99/月 - 娱乐
2. **Spotify Premium** - $9.99/月 - 娱乐
3. **Notion Pro** - $8.00/月 - 生产力
4. **ChatGPT Plus** - $20.00/月 - 生产力
5. **GitHub Pro** - $4.00/月 - 开发工具
6. **iCloud+** - $2.99/月 - 云服务
7. **New York Times** - $17.00/月 - 新闻资讯
8. **Adobe Creative Cloud** - $52.99/月 - 生产力
9. **Nike Training Club** - $14.99/月 - 健康健身 (有结束日期)
10. **Steam** - $59.99/年 - 娱乐
11. **Dropbox Plus** - $9.99/月 - 云服务 (已暂停)
12. **Figma Professional** - $12.00/月 - 开发工具

## 如何使用模拟数据

### 方法一：浏览器控制台 (推荐)

1. 在开发模式下启动应用
2. 打开浏览器开发者工具 (F12)
3. 在控制台中运行以下命令：

```javascript
// 加载模拟数据
window.devTools.loadMockData()

// 查看模拟数据
window.devTools.showMockData()

// 检查是否有现有数据
window.devTools.hasExistingData()

// 清除所有数据
window.devTools.clearAllData()
```

### 方法二：直接导入

如果你需要在代码中使用这些数据，可以直接导入：

```typescript
import { mockSubscriptions, mockCategories, mockState } from "@/data/mockSubscriptions";

// 使用单个订阅
const netflix = mockSubscriptions[0];

// 使用所有分类
const categories = mockCategories;

// 使用完整状态
const fullState = mockState;
```

## 数据特点

- **日期格式**: 所有日期都使用 ISO 8601 格式 (如 "2025-01-01T00:00:00.000Z")
- **货币**: 主要使用 USD，符合应用的货币代码要求
- **图标类型**: 包含三种图标类型：
  - `builtin`: 使用内置的 Lucide 图标
  - `text`: 使用文本图标 (如 "AI", "CC")
  - `favicon`: 可以使用 URL 图标 (未在示例中使用)
- **状态**: 大部分订阅为 "active"，一个为 "paused" 状态
- **周期**: 包含月度和年度订阅
- **价格**: 涵盖不同价格范围，从 $2.99 到 $59.99

## 开发注意事项

- 模拟数据会覆盖现有的本地存储数据
- 在生产环境中，开发工具不会被加载
- 所有日期都设置在 2025 年，确保数据的时效性
- 数据符合 Zod 验证模式，确保类型安全

## 自定义数据

如果需要修改或添加新的模拟数据，请编辑 `/src/data/mockSubscriptions.ts` 文件。确保：

1. 遵循 TypeScript 类型定义
2. 使用正确的日期格式
3. 图标名称存在于 `GenericIcons` 中
4. 货币代码在支持的列表中
5. 分类 ID 在分类对象中存在
