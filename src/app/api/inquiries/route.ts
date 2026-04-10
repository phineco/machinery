import { NextRequest, NextResponse } from 'next/server';
import xss from 'xss';
import validator from 'validator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { name, email, phoneNumber, message, productId } = body;

    if (!name || (!email && !phoneNumber)) {
      return NextResponse.json(
        { error: 'Name and either email or phone number are required' },
        { status: 400 }
      );
    }

    // --- 安全校验与清洗 ---
    // 1. 去除两端空格
    name = validator.trim(name);
    email = email ? validator.trim(email) : '';
    phoneNumber = phoneNumber ? validator.trim(phoneNumber) : '';
    message = message ? validator.trim(message) : '';
    productId = productId ? validator.trim(productId) : '';

    // 2. 防止 XSS 攻击，过滤所有的危险 HTML 标签和脚本
    name = xss(name);
    email = xss(email);
    phoneNumber = xss(phoneNumber);
    message = xss(message);
    productId = xss(productId);

    // 3. 基础格式校验
    if (!validator.isLength(name, { min: 1, max: 64 })) {
      return NextResponse.json({ error: 'Name length is invalid' }, { status: 400 });
    }
    if (email && !validator.isEmail(email)) {
      return NextResponse.json({ error: 'Email format is invalid' }, { status: 400 });
    }
    if (phoneNumber && !validator.isLength(phoneNumber, { min: 1, max: 64 })) {
      return NextResponse.json({ error: 'Phone number length is invalid' }, { status: 400 });
    }

    if (!validator.isLength(message, { min: 1, max: 1024 })) {
      return NextResponse.json({ error: 'message is invalid' }, { status: 400 });
    }

    // 模拟数据库存储，返回成功响应
    const inquiry = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      phoneNumber,
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