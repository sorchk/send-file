#FROM python:3.9-slim
FROM python:3.9-alpine
MAINTAINER sorc@sction.org
COPY ./backend/* /app/
ENV TZ="Asia/Shanghai"
WORKDIR /app
RUN pip install --upgrade pip && \
pip install -r requirements.txt
EXPOSE 12345
CMD ["python","main.py"]