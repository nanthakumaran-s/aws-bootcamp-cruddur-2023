FROM python:3.10-slim-buster

WORKDIR /backend-flask

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

ENV FLASK_ENV=development

EXPOSE ${PORT}

COPY startup_script.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/startup_script.sh

CMD ["/usr/local/bin/startup_script.sh"]