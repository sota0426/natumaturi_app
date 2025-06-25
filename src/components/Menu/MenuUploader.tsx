'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog';

export default function MenuUploader() {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleUpload = async () => {
    setIsLoading(true);

    try {
      // data.json 読み込み
      const res = await fetch("data.json");
      const data = await res.json();

      // localStorage に保存（上書き）
      localStorage.setItem('menuData', JSON.stringify(data));

      alert('メニューの初期化と保存が完了しました');
    } catch (error) {
      console.error('ローカル保存エラー:', error);
      alert('エラーが発生しました');
    } finally {
      setIsLoading(false);
      setShowDialog(false);
    }
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <Button disabled={isLoading}>メニュー登録（初期化）</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>確認</AlertDialogTitle>
          <AlertDialogDescription>
            既存のメニューをすべて削除して、新しいデータで登録します。よろしいですか？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setShowDialog(false)}>キャンセル</Button>
          <Button onClick={handleUpload} disabled={isLoading}>
            {isLoading ? '処理中...' : 'はい、実行します'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
