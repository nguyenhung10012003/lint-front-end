# Sử dụng image node phiên bản 20
FROM node:20

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và yarn.lock vào thư mục làm việc
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Cài đặt các dependencies
RUN yarn install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Build ứng dụng Next.js
RUN yarn run build

# Mở cổng 3000 để truy cập ứng dụng
EXPOSE 3000

# Khởi chạy ứng dụng khi container được chạy
CMD ["yarn", "start"]