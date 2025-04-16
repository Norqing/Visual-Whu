# backend/app/api/heritage_items.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.models import get_db, HeritageItem
from app.models.schemas import HeritageItemCreate, HeritageItemResponse, HeritageItemUpdate

router = APIRouter()


@router.get("/", response_model=List[HeritageItemResponse])
def get_heritage_items(
        skip: int = 0,
        limit: int = 100,
        db: Session = Depends(get_db)
):
    """获取非遗项目列表"""
    items = db.query(HeritageItem).offset(skip).limit(limit).all()
    return items


@router.get("/{item_id}", response_model=HeritageItemResponse)
def get_heritage_item(item_id: int, db: Session = Depends(get_db)):
    """获取单个非遗项目详情"""
    item = db.query(HeritageItem).filter(HeritageItem.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="非遗项目不存在")
    return item


@router.post("/", response_model=HeritageItemResponse)
def create_heritage_item(item: HeritageItemCreate, db: Session = Depends(get_db)):
    """创建新的非遗项目"""
    db_item = HeritageItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.get("/stats/by-category")
def get_stats_by_category(db: Session = Depends(get_db)):
    """获取按类别统计的非遗项目数量（用于ECharts可视化）"""
    from sqlalchemy import func
    from app.models.models import Category

    result = db.query(
        Category.name,
        func.count(HeritageItem.id).label("count")
    ).join(HeritageItem).group_by(Category.name).all()

    categories = [r[0] for r in result]
    counts = [r[1] for r in result]

    return {
        "categories": categories,
        "counts": counts
    }