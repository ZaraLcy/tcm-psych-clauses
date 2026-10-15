#!/bin/sh
# 更新 index.html 內 css/js/圖片的版本號，避免瀏覽器快取舊檔
V=$(date +%Y%m%d%H%M)
sed -i -E "s#(style\.css|data\.js|app\.js|assets/capybara\.png|assets/favicon\.png)(\?v=[0-9]+)?#\1?v=$V#g" index.html
echo "version $V"
