export interface UserInfo {
  id: string;
  roleIdList?: string[];
  postIdList?: string[];
  roleNames?: string;
  roleIds?: string;
  admin?: boolean;
}

export interface ApiProduct {
  id: string;
  createDate: string;
  createBy?: string | UserInfo;
  updateDate?: string;
  updateBy?: string | UserInfo;
  delFlag?: number;
  stockId: string;
  brand: string;
  model: string;
  type: string;
  years: string;
  price: number;
  hours: number;
  netWeight: number;
  description: string;
  techParams: string;
  imgUrl: string;
  videoUrl: string;
  status: string;
  inDate: string;
  saleInfo: string;
  isRecommend: string;
}

export interface OrderItem {
  column: string;
  asc: boolean;
}

export interface ApiPageResponse<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  orders: OrderItem[];
  optimizeCountSql: boolean;
  hitCount: boolean;
  searchCount: boolean;
  pages: number;
}

export interface ProductQueryParams {
  current?: number;
  size?: number;
  brand?: string;
  model?: string;
  type?: string;
  status?: string;
  isRecommend?: string;
  [key: string]: any;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8082/api';

/**
 * 获取产品列表（支持分页、滚动加载和传入参数查询）
 * 返回数据结构对应 /products.json
 *
 * @param params ProductQueryParams
 * @returns Promise<ApiPageResponse<ApiProduct>>
 */
export async function fetchProducts(params: ProductQueryParams = {}): Promise<ApiPageResponse<ApiProduct>> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  const url = `${API_BASE_URL}/machiapi/getMachineList${queryString ? `?${queryString}` : ''}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // cache: 'no-store', // 如需实时数据可取消注释
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error;
  }
}

export interface InquiryData {
  name: string;
  email?: string;
  phoneNumber?: string;
  message?: string;
  productId?: string;
  [key: string]: any;
}

/**
 * 提交询盘表单数据
 *
 * @param data 询盘表单数据
 * @returns Promise<any>
 */
export async function submitInquiry(data: InquiryData): Promise<any> {
  // 注意：此处是提交给前端自己的 Next.js API Route 进行参数校验和清洗
  const url = `/api/inquiries`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to submit inquiry: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in submitInquiry:', error);
    throw error;
  }
}

/**
 * 获取产品详细信息
 * 返回数据结构对应 /product.json
 *
 * @param id 产品ID
 * @param locale 当前页面语言代码（如 'en', 'zh', 'es'）
 * @returns Promise<ApiProduct>
 */
export async function fetchProductById(id: string, locale: string = 'en'): Promise<ApiProduct> {
  const safeId = encodeURIComponent(id);
  const safeLocale = encodeURIComponent(locale);
  const url = `${API_BASE_URL}/machiapi/queryMachineById/?id=${safeId}&localCode=${safeLocale}`;
  console.log(url)
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product details: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in fetchProductById for ID ${id}:`, error);
    throw error;
  }
}