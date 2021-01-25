FROM python:3.7-alpine

WORKDIR /usr/src/app

RUN mkdir /usr/src/app/data

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE 7000

CMD ["python", "server.py"]
