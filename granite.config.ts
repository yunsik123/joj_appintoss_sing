import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
    appName: 'joj-miniapp1', // 앱인토스 콘솔 앱 이름 (고유값)
    brand: {
        displayName: '이곡어때',
        primaryColor: '#22D3EE', // Cyan 네온 컬러
        icon: '', // 아이콘 URL (나중에 설정 필요)
    },
    web: {
        host: 'localhost',
        port: 5173,
        commands: {
            dev: 'vite',
            build: 'vite build',
        },
    },
    permissions: [],
});
