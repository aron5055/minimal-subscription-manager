# 简单订阅管理器

*一个极简的、完全客户端的订阅费用追踪应用*

> 响应式 • 拖拽卡片 • 多货币 • 多语言

🌍 **其他语言版本：** [English](../README.md) • [日本語](README.ja.md)

---

## 📖 目录
- [简单订阅管理器](#简单订阅管理器)
  - [📖 目录](#-目录)
  - [🌐 在线演示](#-在线演示)
  - [✨ 功能特性](#-功能特性)
  - [🛠️ 技术栈](#️-技术栈)
  - [🚀 快速开始](#-快速开始)
  - [📈 路线图](#-路线图)
  - [🤝 贡献](#-贡献)
  - [📄 许可证](#-许可证)

---

## 🌐 在线演示
> [链接](https://minimal-subscription-manager.vercel.app/)

<p align="center">
  <video src="../assets/demo.mp4" width="600" controls autoplay loop muted></video>
</p>

## ✨ 功能特性
- **响应式设计** – 适配桌面端和移动端
- **拖拽卡片排序** – 快速手动重新排序
- **自动续费处理** – 到期时自动延长周期（用户通知即将推出）
- **月度/年度统计** – 带饼图和总费用，按*类别*或*订阅*分组
- **筛选和排序** – 按状态、价格、日期、类别等筛选
- **浅色/深色主题** 和可选的卡片背景色
- **国际化：** 英语、简体中文、日本語
- **默认货币选择器** – 从21种ISO-4217货币中选择
- **三种计费周期**：每日、每月、每年
- **导入/导出** JSON数据，方便备份和迁移

## 🛠️ 技术栈
| 用途 | 库 |
|------|-----|
| UI / 框架 | React 18 + TypeScript |
| 构建工具   | Vite |
| 样式      | Tailwind CSS ＋ shadcn/ui |
| 拖拽功能   | dnd-kit |
| 图表      | Recharts |
| 表单和验证 | React-Hook-Form + Zod |
| 组件      | Radix UI primitives |
| 其他工具   | currency-symbol-map, nanoid, lucide-react, etc. |

## 🚀 快速开始
```bash
git clone https://github.com/aron5055/minimal-subscription-manager.git
cd minimal-subscription-manager
npm install          # 或者使用 npm / yarn
npm dev              # http://localhost:5173
npm build            # 生产构建
npm preview          # 可选预览
```
> 要求：Node 18+ 和现代浏览器

## 📈 路线图
- 即将到期的续费用户通知
- 上传自定义图标
- 云同步（可选）
- PWA 可安装性
- 更细粒度的权限和角色

## 🤝 贡献
欢迎提交 Issue 和 PR！如果您计划进行大的更改，请先开一个 issue。

## 📄 许可证
MIT © 2025 Aron (见 LICENSE)。