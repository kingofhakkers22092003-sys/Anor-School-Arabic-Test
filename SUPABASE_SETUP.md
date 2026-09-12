# Supabase bilan sozlash

1. [Supabase Dashboard](https://supabase.com/dashboard) saytida yangi bepul loyiha yarating.
2. Project ichida **SQL Editor** ni oching. `supabase-schema.sql` faylidagi hamma SQL kodni joylashtirib **Run** qiling.
3. **Connect** oynasidan `Project URL` va **secret** (`sb_secret_...`) kalitini oling.
4. `.env.example` nusxasini `.env` nomi bilan saqlang. `SUPABASE_URL` va `SUPABASE_SECRET_KEY` qiymatlarini kiriting.
5. Eski lokal savol hamda o‘quvchilarni bir marta ko‘chirish uchun terminalda quyidagini ishga tushiring:

   ```powershell
   npm run migrate:supabase
   ```

6. Render Web Service -> **Environment** bo‘limida `SUPABASE_URL` va `SUPABASE_SECRET_KEY` ni qo‘shing. So‘ng **Manual Deploy** qiling.

`secret` maxfiy kalit. Uni GitHub'ga qo‘ymang va brauzer JavaScriptiga yozmang. Bu loyiha undan faqat server tarafida foydalanadi.
