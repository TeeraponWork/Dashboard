FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build -- --base-href /app/

FROM nginx:alpine

COPY --from=builder /app/dist/ecommerce-admin-portal/browser /usr/share/nginx/html/app

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
