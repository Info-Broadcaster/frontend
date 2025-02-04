FROM node:20-alpine AS builder

ENV VITE_BACKEND_URL http://localhost:3000
ENV VITE_DEBUG false

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=5 \
    CMD curl -f http://localhost || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
