# backend/init_db.py
from app.models.models import init_db, SessionLocal, Category, Region, HeritageItem


def seed_data():
    db = SessionLocal()
    try:
        # 检查数据库是否已有数据
        if db.query(Category).count() > 0:
            print("数据库已初始化，跳过")
            return

        # 添加类别
        categories = [
            Category(name="传统音乐", description="包括民间音乐、戏曲音乐等", icon="music_note"),
            Category(name="传统舞蹈", description="包括民间舞蹈、宗教舞蹈等", icon="directions_run"),
            Category(name="传统戏剧", description="包括戏曲、木偶戏、皮影戏等", icon="theater_comedy"),
            Category(name="传统技艺", description="包括陶瓷、刺绣、剪纸等", icon="construction"),
            Category(name="传统美术", description="包括绘画、雕塑等", icon="palette"),
        ]
        db.add_all(categories)
        db.commit()

        # 添加地区
        regions = [
            Region(name="北京", province="北京市", city="北京市", longitude=116.407, latitude=39.904),
            Region(name="上海", province="上海市", city="上海市", longitude=121.473, latitude=31.231),
            Region(name="杭州", province="浙江省", city="杭州市", longitude=120.155, latitude=30.287),
            Region(name="苏州", province="江苏省", city="苏州市", longitude=120.589, latitude=31.304),
            Region(name="成都", province="四川省", city="成都市", longitude=104.065, latitude=30.659),
        ]
        db.add_all(regions)
        db.commit()

        # 添加非遗项目
        items = [
            HeritageItem(
                name="京剧",
                description="中国五大戏曲之一，形成于北京",
                history="京剧是19世纪中期形成的戏曲剧种，由徽班进京演出所形成",
                image_url="/static/images/beijing_opera.jpg",
                recognition_year=2010,
                popularity=95,
                category_id=3,  # 传统戏剧
                region_id=1,  # 北京
            ),
            HeritageItem(
                name="景德镇陶瓷",
                description="千年瓷都，世界闻名的陶瓷工艺",
                history="景德镇陶瓷有着2000多年的历史，是中国制瓷工艺的代表",
                image_url="/static/images/jingdezhen.jpg",
                recognition_year=2009,
                popularity=90,
                category_id=4,  # 传统技艺
                region_id=2,  # 上海(临时)
            ),
            HeritageItem(
                name="苏州刺绣",
                description="中国四大名绣之一",
                history="苏绣历史悠久，至少有2000多年历史，以精细著称",
                image_url="/static/images/suzhou_embroidery.jpg",
                recognition_year=2006,
                popularity=85,
                category_id=4,  # 传统技艺
                region_id=4,  # 苏州
            ),
        ]
        db.add_all(items)
        db.commit()

        print("数据库初始化完成")
    except Exception as e:
        print(f"初始化数据库时出错: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    print("初始化数据库...")
    init_db()  # 创建表
    seed_data()  # 填充数据