from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from pathlib import Path
import json

from app.models.models import get_db
from app.models.schemas import LocalPolicyItemResponse

router = APIRouter()

@router.get("/local-policy", response_model=List[LocalPolicyItemResponse])
async def get_local_policy(province: str = None, db: Session = Depends(get_db)):
    """根据省份获取地方非遗政策"""
    file_path = Path("data/_地方非遗政策.json")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if province:
                # 过滤出指定省份的政策
                filtered_data = [item for item in data if item["province"] == province]
            else:
                # 如果没有指定省份，返回所有数据
                filtered_data = data
            
            return [{
                "id": item["id"],
                "title": item["title"],
                "url": item["url"],
                "province": item["province"]
            } for item in filtered_data]
    except Exception as e:
        print(f"加载地方政策文件失败: {e}")
        return []