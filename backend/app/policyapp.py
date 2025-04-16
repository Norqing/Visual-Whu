from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from pathlib import Path
import json

from app.models.models import get_db
from app.models.schemas import PolicyItemResponse

router = APIRouter()

@router.get("/policy-content", response_model=List[PolicyItemResponse])
async def get_policy_content(db: Session = Depends(get_db)):
    """获取国家非遗政策内容"""
    file_path = Path("data/_国家非遗政策.json")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return [{"id": idx+1, "content": item["content"], "body": item["body"]} 
                   for idx, item in enumerate(data)]
    except Exception as e:
        print(f"加载政策文件失败: {e}")
        return []

@router.get("/policy-content-paginated", response_model=dict)
async def get_paginated_policy(
    page: int = 1, 
    page_size: int = 9,
    db: Session = Depends(get_db)
):
    """分页获取政策内容"""
    file_path = Path("data/_国家非遗政策.json")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            start = (page - 1) * page_size
            end = start + page_size
            return {
                "items": [{"id": idx+1, "content": item["content"]} for idx, item in enumerate(data[start:end])],
                "total": len(data),
                "page": page,
                "page_size": page_size
            }
    except Exception as e:
        print(f"加载政策文件失败: {e}")
        return {"items": [], "total": 0}

@router.get("/policy-content-by-id")
async def get_policy_by_id(id: int):
    """根据ID获取单个政策内容"""
    file_path = Path("data/_国家非遗政策.json")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            item = next((item for item in data if item.get("id") == id), None)
            return item or {"body": "未找到对应内容"}
    except Exception as e:
        print(f"加载政策文件失败: {e}")