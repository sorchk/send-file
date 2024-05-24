## 后端开发 初始化
cd backend
python -m venv venv
source .venv/bin/activate
pip install -r requirements.txt
## 运行后端
python main.py

## 前端开发 初始化
volta pin node@20
volta pin yarn@1
yarn
## 运行前端
yarn run dev