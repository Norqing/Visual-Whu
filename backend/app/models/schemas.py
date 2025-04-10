# backend/app/models/schemas.py
from pydantic import BaseModel
from typing import Optional, List


# 类别模型
class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None
    icon: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    id: int

    class Config:
        orm_mode = True


# 地区模型
class RegionBase(BaseModel):
    name: str
    province: str
    city: Optional[str] = None
    longitude: float
    latitude: float


class RegionCreate(RegionBase):
    pass


class RegionResponse(RegionBase):
    id: int

    class Config:
        orm_mode = True


# 非遗项目模型
class HeritageItemBase(BaseModel):
    name: str
    description: str
    history: Optional[str] = None
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    recognition_year: Optional[int] = None
    popularity: Optional[int] = 0
    category_id: int
    region_id: int


class HeritageItemCreate(HeritageItemBase):
    pass


class HeritageItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    history: Optional[str] = None
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    recognition_year: Optional[int] = None
    popularity: Optional[int] = None
    category_id: Optional[int] = None
    region_id: Optional[int] = None


class HeritageItemResponse(HeritageItemBase):
    id: int

    class Config:
        orm_mode = True


# 在文件末尾添加
class PolicyItemBase(BaseModel):
    content: str

class PolicyItemCreate(PolicyItemBase):
    pass

class PolicyItemResponse(PolicyItemBase):
    id: int
    
    class Config:
        orm_mode = True


class LocalPolicyItemResponse(BaseModel):
    id: int
    title: str
    url: int
    province: str