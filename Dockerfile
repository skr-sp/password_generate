FROM nginx:alpine

# 静的ファイルをNginxのドキュメントルートにコピー
COPY index.html /usr/share/nginx/html/
COPY index.js /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/

# Nginxの設定ファイルをコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
