# Giai đoạn 1: Build ứng dụng với Maven và OpenJDK 21
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy toàn bộ dự án vào container
COPY . .

# Chạy lệnh Maven để build project (tạo file .jar)
RUN mvn clean package -DskipTests

# Giai đoạn 2: Runtime - Sử dụng JDK 21 nhẹ hơn
FROM eclipse-temurin:21-jre-jammy

# Copy file JAR từ giai đoạn build trước
COPY --from=builder /app/target/*.jar app.jar

# Expose cổng 8080
EXPOSE 8080

# Chạy ứng dụng
CMD ["java", "-jar", "app.jar"]
