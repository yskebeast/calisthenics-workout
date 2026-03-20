import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-8 py-32 px-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Calisthenics Workout
          </h1>
          <p className="text-lg text-gray-600">
            自重トレーニングを記録・管理するアプリ
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            ログイン
          </Link>
          <Link
            href="/signup"
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            新規登録
          </Link>
        </div>
      </main>
    </div>
  );
}
