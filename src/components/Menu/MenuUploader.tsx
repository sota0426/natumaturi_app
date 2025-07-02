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
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function MenuUploader() {
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const { 
    setMenus,
    setCategories,
    saveToLocalStorage
  } = useLocalStorage();



  const handleUpload =  async () => {
    setIsLoading(true);
    try {
     saveToLocalStorage(categories, menuItems);
    // 状態も更新！（これがないと再レンダリングされない）
    setCategories([...categories]); // 配列をコピーして状態変化を明示
    setMenus([...menuItems]);


    } catch (error) {
      console.error('ローカル保存エラー:', error);
      alert('エラーが発生しました');
    } finally {
      setIsLoading(false);
      setShowDialog(false);
    }
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
