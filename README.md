# ラーメンAI管理画面

ラーメンAIシステムの管理画面フロントエンドアプリケーションです。

## 機能

- 管理者認証
- 店舗管理（作成・編集・削除）
- メニュー管理（作成・編集・削除・画像アップロード）
- ダッシュボード

## 技術スタック

- React 18 + TypeScript
- React Router v6
- TanStack Query (React Query)
- React Hook Form + Yup
- Tailwind CSS
- Lucide React (アイコン)
- React Hot Toast (通知)

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env`ファイルを編集して、バックエンドAPIのURLを設定してください：

```env
PORT=3001
REACT_APP_API_URL=http://localhost:3000
REACT_APP_APP_NAME=ラーメンAI管理画面
```

### 3. 開発サーバーの起動

```bash
npm start
```

ブラウザで http://localhost:3001 を開いてアプリケーションにアクセスできます。

## ビルド

```bash
npm run build
```

本番用にビルドされたファイルは`build`フォルダに出力されます。

## API連携

このアプリケーションは`ramen-ai-backend`のAdmin APIと連携します。以下のエンドポイントを使用します：

- `POST /auth` - ログイン
- `DELETE /auth` - ログアウト
- `GET /shops` - 店舗一覧取得
- `POST /shops` - 店舗作成
- `PUT /shops/:id` - 店舗更新
- `DELETE /shops/:id` - 店舗削除
- `GET /menus` - メニュー一覧取得
- `POST /menus` - メニュー作成
- `PUT /menus/:id` - メニュー更新
- `PATCH /menus/:id/attach_image` - メニュー画像アップロード
- `DELETE /menus/:id` - メニュー削除
- `GET /genres` - ジャンル一覧取得
- `GET /soups` - スープ一覧取得
- `GET /noodles` - 麺一覧取得

## 開発

### コンポーネント構成

```
src/
├── components/          # 再利用可能なコンポーネント
│   ├── ui/             # UIベースコンポーネント
│   ├── layout/         # レイアウトコンポーネント
│   └── forms/          # フォームコンポーネント
├── pages/              # ページコンポーネント
├── hooks/              # カスタムフック
├── services/           # API通信
├── types/              # TypeScript型定義
├── context/            # React Context
└── utils/              # ユーティリティ関数
```

### 認証

JWT トークンを使用した認証システムを実装しています。トークンはlocalStorageに保存され、API リクエストの Authorization ヘッダーに自動的に付与されます。

### 状態管理

TanStack Query を使用してサーバー状態を管理し、フォーム状態は React Hook Form で管理しています。

## テスト

```bash
npm test
```
