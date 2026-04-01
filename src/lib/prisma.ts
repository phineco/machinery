// 简化的数据存储，不使用Prisma
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  productId?: string;
  createdAt: Date;
}

// 内存中的数据存储
const inquiries: Inquiry[] = [];

export const db = {
  inquiry: {
    create: async (data: Omit<Inquiry, 'id' | 'createdAt'>) => {
      const inquiry: Inquiry = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date()
      };
      inquiries.push(inquiry);
      return inquiry;
    },
    findMany: async () => {
      return inquiries;
    }
  }
};