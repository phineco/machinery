import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, contact, message, productId } = body;

    if (!name || !contact) {
      return NextResponse.json(
        { error: 'Name and contact are required' },
        { status: 400 }
      );
    }

    // 模拟数据库存储，返回成功响应
    const inquiry = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      contact,
      message,
      productId,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}