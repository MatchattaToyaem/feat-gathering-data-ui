FROM node:10.22 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
ARG END_POINTS
ENV REACT_APP_END_POINTS ${END_POINTS}
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]