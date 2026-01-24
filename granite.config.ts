import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
    appName: 'joj-miniapp1', // 앱인토스 콘솔 앱 이름 (고유값)
    brand: {
        displayName: 'Hats',
        primaryColor: '#8B5CF6', // 앱의 메인 컬러 (index.css의 --primary 참조)
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
