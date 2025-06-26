import { Category, MenuItem } from "@/types";

export const categories: Category[]=[
  { id: 1, name: "くじ・遊び" },
  { id: 2, name: "ソフトドリンク" },
  { id: 3, name: "アルコール・カクテル" },
  { id: 4, name: "軽食" },
  { id: 5, name: "スイーツ" },
  { id: 6, name: "焼き鳥" },
  { id: 7, name: "屋台" }
]

export const menuItems: MenuItem[] = [
  { id: 11, categoryId: 1, categoryName: "くじ・遊び", name: "あてものや", price: 250, stock: 10 },
  { id: 21, categoryId: 2, categoryName: "ソフトドリンク", name: "ラムネ", price: 100, stock: 10 },
  { id: 22, categoryId: 2, categoryName: "ソフトドリンク", name: "お茶", price: 100, stock: 10 },
  { id: 23, categoryId: 2, categoryName: "ソフトドリンク", name: "ジュース", price: 120, stock: 10 },
  { id: 24, categoryId: 2, categoryName: "ソフトドリンク", name: "光るボトル（カルピス）", price: 400, stock: 10 },
  { id: 25, categoryId: 2, categoryName: "ソフトドリンク", name: "光るボトル（オレンジ）", price: 400, stock: 10 },
  { id: 26, categoryId: 2, categoryName: "ソフトドリンク", name: "光るボトル（ぶどう）", price: 400, stock: 10 },
  { id: 31, categoryId: 3, categoryName: "アルコール・カクテル", name: "ノンアルコールカクテル", price: 150, stock: 10 },
  { id: 32, categoryId: 3, categoryName: "アルコール・カクテル", name: "ハイボール（缶）", price: 170, stock: 10 },
  { id: 33, categoryId: 3, categoryName: "アルコール・カクテル", name: "生ビール", price: 400, stock: 10 },
  { id: 34, categoryId: 3, categoryName: "アルコール・カクテル", name: "レモンサワー", price: 300, stock: 10 },
  { id: 41, categoryId: 4, categoryName: "軽食", name: "おにぎり（ツナマヨ）", price: 150, stock: 10 },
  { id: 42, categoryId: 4, categoryName: "軽食", name: "おにぎり（鮭）", price: 150, stock: 10 },
  { id: 43, categoryId: 4, categoryName: "軽食", name: "焼きそば", price: 350, stock: 10 },
  { id: 44, categoryId: 4, categoryName: "軽食", name: "ポテから", price: 550, stock: 10 },
  { id: 51, categoryId: 5, categoryName: "スイーツ", name: "かき氷（いちご）", price: 130, stock: 10 },
  { id: 52, categoryId: 5, categoryName: "スイーツ", name: "かき氷（ブルーハワイ）", price: 130, stock: 10 },
  { id: 53, categoryId: 5, categoryName: "スイーツ", name: "かき氷（レモン）", price: 130, stock: 10 },
  { id: 61, categoryId: 6, categoryName: "焼き鳥", name: "つくね（たれ）", price: 380, stock: 10 },
  { id: 62, categoryId: 6, categoryName: "焼き鳥", name: "つくね（塩）", price: 380, stock: 10 },
  { id: 63, categoryId: 6, categoryName: "焼き鳥", name: "とりもも（たれ）", price: 470, stock: 10 },
  { id: 64, categoryId: 6, categoryName: "焼き鳥", name: "とりもも（塩）", price: 470, stock: 10 },
  { id: 65, categoryId: 6, categoryName: "焼き鳥", name: "とり皮（たれ）", price: 380, stock: 10 },
  { id: 66, categoryId: 6, categoryName: "焼き鳥", name: "とり皮（塩）", price: 380, stock: 10 },
  { id: 67, categoryId: 6, categoryName: "焼き鳥", name: "タン（塩）", price: 470, stock: 10 },
  { id: 71, categoryId: 7, categoryName: "肉料理", name: "肉巻きドッグ", price: 480, stock: 10 },
  { id: 72, categoryId: 7, categoryName: "肉料理", name: "フランクフルト", price: 330, stock: 10 },
  { id: 73, categoryId: 5, categoryName: "スイーツ", name: "シャーベットアイス", price: 380, stock: 10 }
];