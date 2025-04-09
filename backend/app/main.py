from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
from pathlib import Path

app = FastAPI(title="非遗文化展示系统", description="非物质文化遗产展示平台API")

# 启用CORS，允许前端访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 开发环境，生产环境应限制为特定域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 路由导入
from app.api import heritage_items
from app import policyapp
from app import map  # 添加这行

# 注册路由
app.include_router(heritage_items.router, prefix="/api/heritage", tags=["heritage"])

app.include_router(
    policyapp.router,
    prefix="/api",
    tags=["policy"]
)

# 在路由注册部分添加
app.include_router(
    map.router,
    prefix="/api",
    tags=["map"]
)

# 挂载静态文件目录
# 修改静态文件路径配置
static_dir = Path(__file__).parent / "static"
static_dir.mkdir(exist_ok=True)  # 确保目录存在

app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get("/")
async def root():
    return {"message": "欢迎访问非遗文化展示系统API"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)