FROM nginx:latest

# Устанавливаем необходимые пакеты для git
RUN apt-get update && apt-get install -y git 

# Удаляем существующие файлы из /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*

# Клонируем репозиторий с статическими файлами
RUN git clone https://github.com/Ashimka/Math.git /usr/share/nginx/html

# Удаляем кэш apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]