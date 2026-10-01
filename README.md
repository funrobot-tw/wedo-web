# WeDo Web

用瀏覽器就能替 LEGO® WeDo 2.0 主機寫積木程式，不用安裝 App。
支援原廠 WeDo 2.0 Smarthub，也支援副廠相容主機（「LPF2 Smart Hub」、「M_SmartCar」）。

**👉 開始使用：** https://github.com/funrobot-tw/wedo-web

**📱 使用教學（iPad / iPhone / Android）：** https://wedo.funrobot.tw/guide.html

## 功能

- 跟原版 WeDo 2.0 一樣的積木、排列順序與操作方式
- 馬達、傾斜感測器、距離感測器、燈光、聲音、顯示器
- 「比較」積木：距離／聲音／顯示器／傾斜 大於、小於、等於
- 右下角即時顯示 Port 1、Port 2 接了什麼裝置和目前數值
- 首頁專案清單：自動儲存、縮圖、改名、複製、刪除
- 匯出／匯入專案檔（.json），可整批備份
- 中文／English 介面
- 開發者模式（老師檢查連線紀錄用）

## 需要的環境

| 裝置 | 瀏覽器 |
|---|---|
| Windows / macOS / Chromebook | Chrome、Edge、Arc 等 Chromium 瀏覽器 |
| Android | Chrome |
| iPad / iPhone | **Bluefy**（Safari 不支援網頁藍牙） |

網頁必須用 `https://` 開啟才能使用藍牙，GitHub Pages 已經是 https。

## 專案存在哪裡？

專案存在**這台裝置的這個瀏覽器**裡（IndexedDB），不會上傳到任何伺服器。

- 只清除「快取」不會刪掉專案；清除「Cookie 和網站資料」會。
- 換電腦、換瀏覽器、或網址改變，都看不到原本的專案。
- 學校電腦如果有還原卡，重開機後專案會消失。

**請定期到「設定 → 備份全部專案」存成檔案。**

## 開發者模式

設定裡可以開關，或在網址後面加 `?dev=1`。電腦上也可以按 `Ctrl + Shift + D`。

## 致謝

- 藍牙通訊依據 LEGO® 公司提供的 WeDo 2.0 SDK 製作。
- LEGO®、WeDo 是 LEGO Group 的商標。本專案不是 LEGO Group 製作，也未經其贊助或認可。
