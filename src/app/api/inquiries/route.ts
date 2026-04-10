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
      return NextResponse.json({ error: 'Name length is invalid (must be between 1 and 64 characters)' }, { status: 400 });
    }
    if (email && !validator.isEmail(email)) {
      return NextResponse.json({ error: 'Email format is invalid' }, { status: 400 });
    }
    if (phoneNumber && !validator.isLength(phoneNumber, { min: 1, max: 64 })) {
      return NextResponse.json({ error: 'Phone number length is invalid (must be between 1 and 64 characters)' }, { status: 400 });
    }

    if (message && !validator.isLength(message, { min: 0, max: 1024 })) {
      return NextResponse.json({ error: 'Message length is invalid (maximum 1024 characters)' }, { status: 400 });
    }

    // 模拟数据库存储，返回成功响应
    // 注意：如果是直接转发给 Java 后端，在这里使用 fetch() 调用原 API_BASE_URL 的 /machiapi/saveInquiry
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8082/api';
    const response = await fetch(`${API_BASE_URL}/machiapi/saveInquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phoneNumber,
        message,
        productId
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to save inquiry to backend' }, { status: response.status });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}