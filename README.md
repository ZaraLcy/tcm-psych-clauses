# 傷寒金匱精神心理條文彙編

以《傷寒論（宋本）》《金匱要略方論》（來源：[中醫笈成 jicheng.tw](https://jicheng.tw/)）原文為據，依六大類（情志神志、意識與睡眠、身心相關軀體感受、行為與動作異常、感知異常、飲食與欲望改變）彙編與中醫精神心理相關之條文。純靜態網站，無後端、無需建置。

## 功能
- 類別 → 關鍵詞導覽（含條數），點選後篩選並於條文中以底線標示
- 全文即時搜尋、書目篩選、方劑（方劑索引）篩選
- 條文卡片：出處（書・篇・條號）、方劑與關鍵詞標籤、原文連結
- 網址可分享：`#kw=譫語`、`#f=小柴胡湯`、`#q=煩&b=傷寒論`、`#about`

## 檔案
- `index.html`, `style.css`, `app.js` — 網站
- `data.js` — 網站所用資料（`window.DATA`）；`data.json` — 同內容之 JSON

## 本地預覽
```
python3 -m http.server 8000   # 開啟 http://localhost:8000/
```
（直接以瀏覽器開啟 index.html 亦可。）

## 部署至 GitHub Pages
1. 將本資料夾內容推送至 GitHub 儲存庫之 `main` 分支根目錄。
2. 儲存庫 Settings → Pages → Build and deployment → Source 選「Deploy from a branch」，Branch 選 `main`、資料夾 `/ (root)`，儲存。
3. 數分鐘後於 `https://<帳號>.github.io/<儲存庫>/` 瀏覽。
（已附 `.nojekyll`。）

## 資料產生
由上層目錄 `build.py`（解析與關鍵詞邏輯）與 `export_site.py` 產生 `data.js`/`data.json`。
EOF
