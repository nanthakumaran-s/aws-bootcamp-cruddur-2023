FROM python:3.10-slim-buster AS builder

WORKDIR /backend-flask

COPY requirements.txt requirements.txt
RUN pip3 install --user --no-cache-dir -r requirements.txt

COPY . .

FROM python:3.10-slim-buster

WORKDIR /backend-flask

COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

COPY startup_script.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/startup_script.sh

RUN apt-get update 
RUN apt-get install -y gcc
RUN apt-get install -y curl

ENV FLASK_ENV=development

EXPOSE ${PORT}

CMD [ "/usr/local/bin/startup_script.sh"]