import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: true,  // 네트워크에서 접근 가능하게 설정 (폰에서 테스트용)
    },
    build: {
        chunkSizeWarningLimit: 1000, // 청크 크기 경고 제한 증가
        rollupOptions: {
            output: {
                manualChunks: {
                    'songs': ['./songs.js']
                }
            }
        }
    }
});
