/**
 * 类别枚举类型
 * 1: Excavators
 * 2: Loaders
 * 3: Cranes
 * 4: Bulldozers
 */

/**
 * 将类别枚举数字转换为可读的多语言字符串
 * 
 * @param typeValue API 返回的 type 字符串（如 '1', '2'）
 * @param dict 包含对应多语言词条的字典对象 (如 dict.ProductsPage)
 * @returns 对应当前语言的文本名称
 */
export function getCategoryName(typeValue: string | number, dict: any): string {
  const typeStr = String(typeValue);
  
  switch (typeStr) {
    case '1':
      return dict?.excavators || 'Excavators';
    case '2':
      return dict?.loaders || 'Loaders';
    case '3':
      return dict?.cranes || 'Cranes';
    case '4':
      return dict?.bulldozers || 'Bulldozers';
    default:
      return typeStr || '-';
  }
}
