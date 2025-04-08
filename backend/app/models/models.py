# backend/app/models/models.py
from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

Base = declarative_base()

# 创建数据库引擎 - 使用SQLite，适合本地开发
DATABASE_URL = "sqlite:///./app/data/heritage.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# 获取数据库会话
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 非遗类别表
class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)
    description = Column(Text, nullable=True)
    icon = Column(String(200), nullable=True)

    items = relationship("HeritageItem", back_populates="category")


# 地区表
class Region(Base):
    __tablename__ = "regions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    province = Column(String(50), index=True)
    city = Column(String(50), nullable=True)
    longitude = Column(Float)  # 经度
    latitude = Column(Float)  # 纬度

    items = relationship("HeritageItem", back_populates="region")


# 非遗项目表
class HeritageItem(Base):
    __tablename__ = "heritage_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), index=True)
    description = Column(Text)
    history = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=True)
    video_url = Column(String(500), nullable=True)
    recognition_year = Column(Integer, nullable=True)
    popularity = Column(Integer, default=0)  # 受欢迎程度，用于数据可视化

    category_id = Column(Integer, ForeignKey("categories.id"))
    region_id = Column(Integer, ForeignKey("regions.id"))

    category = relationship("Category", back_populates="items")
    region = relationship("Region", back_populates="items")


# 创建所有表
def create_tables():
    Base.metadata.create_all(bind=engine)


# 初始化数据库
def init_db():
    create_tables()