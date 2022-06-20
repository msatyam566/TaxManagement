WORKDIR /user/nodeapp
COPY ././

RUN npm install

CMD ["nodemon", "index"]