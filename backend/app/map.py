from fastapi import APIRouter
from pathlib import Path
import json

router = APIRouter()

@router.get("/china-map-data")
async def get_china_map_data():
    """获取中国地图GeoJSON数据"""
    file_path = Path("data/china.json")  # 确保文件路径正确
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"加载地图文件失败: {e}")
        return {"error": "地图数据加载失败"}