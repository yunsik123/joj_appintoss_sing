import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: true,  // 네트워크에서 접근 가능하게 설정 (폰에서 테스트용)
    },
    // build.outDir 기본값은 'dist'이며 이는 granite.config.ts의 기본값과 일치함
});
