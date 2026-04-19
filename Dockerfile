FROM oven/bun:1.1.12 AS dev

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . .
EXPOSE 5173
CMD ["bun", "run", "dev", "--host"]


FROM oven/bun:1.1.12 AS builder

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . .
RUN bun run build


FROM nginx:alpine AS prod

COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
