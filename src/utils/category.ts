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

/**
 * 品牌枚举类型
 * 1: Caterpillar
 * 2: Komatsu
 * 3: Hitachi
 * 4: Volvo
 * 5: Doosan
 */

/**
 * 将品牌枚举数字转换为对应的品牌名称
 * 
 * @param brandValue API 返回的 brand 字符串或数字（如 '1', '2'）
 * @returns 品牌名称文本
 */
export function getBrandName(brandValue: string | number | undefined, dict?: any): string {
  if (!brandValue) return '';
  const brandStr = String(brandValue);
  
  switch (brandStr) {
    case '1':
      return dict?.brand_caterpillar || 'Caterpillar';
    case '2':
      return dict?.brand_komatsu || 'Komatsu';
    case '3':
      return dict?.brand_hitachi || 'Hitachi';
    case '4':
      return dict?.brand_doosan || 'Doosan';
    case '5':
      return dict?.brand_sany || 'SANY';
    case '6':
      return dict?.brand_xcmg || 'XCMG';
    default:
      // 如果后端传来的不是数字，而是真实名称，直接返回
      return brandStr;
  }
}
