# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

------------------

VRMPosing – What’s New (v0.2 / v1.0 Preview)
1. VRM Model Viewer

Integrasi VRMViewer.jsx untuk menampilkan model 3D VRM.

Mendukung switch model via dropdown:

Male 00

Female 00

Model bisa di-load secara dinamis tanpa reload page.

2. Loading Indicator

Tambahan loading state saat VRM model sedang dimuat.

Pesan “Loading model…” muncul hingga model siap.

Mencegah tampilan kosong saat switch model.

3. Model File Update

Model lama diganti:

character_v0.vrm → vrm0_male_00.vrm

Penambahan file vrm0_male_01.vrm, vrm0_female_00.vrm, vrm0_female_01.vrm

File tersimpan di public/models/.

4. Git Backup & Branching

Branch backup_before_model_switch dibuat sebelum perbaikan switch model.

Semua perubahan sekarang sudah di-commit.

Bisa rollback ke versi stabil kapan saja dari branch backup.

5. Bug Fixes

Perbaikan error Cannot read properties of null (reading 'removeChild') di VRMViewer saat unmount.

Penanganan Content Security Policy (unsafe-eval) sudah sesuai agar VRMViewer jalan.

Model sekarang keload penuh (bukan hanya outline).

6. Misc / Minor

Struktur folder & file diperbaiki.

App.jsx / App.js sekarang bisa memilih model via dropdown dengan path relatif:

const [modelUrl, setModelUrl] = useState("/models/vrm0_male_00.vrm");





---------------------------

VRMPosing – Release Notes (v0.2 / v1.0 Preview)

What's New:

VRM Model Viewer: Menampilkan model 3D VRM, mendukung switch model via dropdown (Male 00 / Female 00).

Loading Indicator: Pesan “Loading model…” muncul saat model sedang dimuat.

Model Files Update:

character_v0.vrm → vrm0_male_00.vrm

Tambahan: vrm0_male_01.vrm, vrm0_female_00.vrm, vrm0_female_01.vrm

Bug Fixes:

Perbaikan error Cannot read properties of null (reading 'removeChild') di VRMViewer saat unmount.

Model sekarang keload penuh (bukan hanya outline).

Git Backup:

Branch backup_before_model_switch dibuat sebelum perbaikan switch model.

Semua perubahan di-commit dan siap rollback jika diperlukan.

Notes:

File VRM tersimpan di public/models/.

App.jsx sudah mendukung pemilihan model secara dinamis.