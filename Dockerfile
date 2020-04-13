FROM tensorflow/tensorflow:1.15.0-py3
#RUN apk update && apk add --virtual build-dependencies build-base gcc wget git python
#RUN apk add --no-cache vips-dev --verbose --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/ --repository https://dl-3.alpinelinux.org/alpine/edge/main

#RUN apk add vips-dev fftw-dev build-base --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/testing/

RUN apt-get update && apt-get install wget
RUN \
  echo "deb https://deb.nodesource.com/node_12.x buster main" > /etc/apt/sources.list.d/nodesource.list && \
  wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list && \
  wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  apt-get update && \
  apt-get install -yqq nodejs yarn && \
  npm i -g npm@^6 && \
  rm -rf /var/lib/apt/lists/*

ENV HOME=/usr/src
RUN mkdir -p /usr/src/tfviewer
COPY package.json $HOME/tfviewer
COPY requirements.txt $HOME/tfviewer

WORKDIR $HOME/tfviewer
RUN NODE_ENV=production npm install && npm install -g pm2
RUN pip3 install -r requirements.txt
COPY . $HOME/tfviewer

CMD ["npm", "run", "runall"]
