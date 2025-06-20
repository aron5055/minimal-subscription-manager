import { mockState } from "@/data/mockSubscriptions";
import type { State } from "@/types/types";

/**
 * 将模拟数据加载到应用中
 * 这会覆盖现有的本地存储数据
 */
export function loadMockData(): void {
  localStorage.setItem("sm-state", JSON.stringify(mockState));
  // 刷新页面以加载新数据
  window.location.reload();
}

/**
 * 清除所有数据，恢复到空状态
 */
export function clearAllData(): void {
  const emptyState: State = { subs: [], cats: {} };
  localStorage.setItem("sm-state", JSON.stringify(emptyState));
  window.location.reload();
}

/**
 * 检查是否有现有数据
 */
export function hasExistingData(): boolean {
  const stored = localStorage.getItem("sm-state");
  if (!stored) return false;

  try {
    const state: State = JSON.parse(stored);
    return state.subs.length > 0 || Object.keys(state.cats).length > 0;
  } catch {
    return false;
  }
}

/**
 * 在开发模式下，将这些函数添加到全局 window 对象
 * 可以在浏览器控制台中调用
 */
if (import.meta.env.DEV) {
  (window as any).devTools = {
    loadMockData,
    clearAllData,
    hasExistingData,
    showMockData: () => console.table(mockState.subs),
  };

  console.log("🔧 开发工具已加载! 在控制台使用:");
  console.log("  window.devTools.loadMockData() - 加载模拟数据");
  console.log("  window.devTools.clearAllData() - 清除所有数据");
  console.log("  window.devTools.hasExistingData() - 检查是否有数据");
  console.log("  window.devTools.showMockData() - 显示模拟数据");
}
