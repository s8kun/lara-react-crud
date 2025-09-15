# PHP + Laravel
FROM php:8.2-fpm

# تثبيت dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev \
    zip unzip git curl nodejs npm \
    && docker-php-ext-install pdo pdo_mysql gd

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

# تثبيت PHP و JS dependencies
RUN composer install --no-dev --optimize-autoloader
RUN npm install
RUN npm run build

EXPOSE 9000
CMD ["php-fpm"]
