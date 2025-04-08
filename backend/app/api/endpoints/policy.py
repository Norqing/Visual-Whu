from nt import system
from fastapi import APIRouter
import json
from pathlib import Path

router = APIRouter()

@router.get("/policy-content")
async def get_policy_content():
    file_path = Path("data/_国家非遗政策.json")
    print(f"尝试加载文件: {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        print("数据加载成功")
        
    return data