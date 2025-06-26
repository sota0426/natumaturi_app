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
import { categories, menuItems } from '../../../public/data';

export default function MenuUploader() {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleUpload =  () => {
    setIsLoading(true);

    try {
      // 既存のデータを削除
      localStorage.removeItem('menus');
      localStorage.removeItem('categories');      
      // data.ts 読み込み
      localStorage.setItem("menus",JSON.stringify(menuItems));
      localStorage.setItem('categories', JSON.stringify(categories)); 

      alert('メニューの初期化と保存が完了しました');
    } catch (error) {
      console.error('ローカル保存エラー:', error);
      alert('エラーが発生しました');
    } finally {
      setIsLoading(false);
      setShowDialog(false);
    }


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