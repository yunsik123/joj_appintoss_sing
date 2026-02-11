import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
    appName: 'joj-miniapp1', // 앱인토스 콘솔 앱 이름 (고유값)
    scheme: 'intoss', // 기능스킴: intoss://joj-miniapp1 으로 앱 실행
    brand: {
        displayName: '이곡어때',
        primaryColor: '#22D3EE', // Cyan 네온 컬러
        icon: 'https://raw.githubusercontent.com/yunsik123/joj_appintoss_sing/master/public/logo.png', // 앱 로고 (네이티브 네비게이션 바에 표시하려면 반드시 http/https URL 필요)
    },
    web: {
        host: 'localhost',
        port: 5173,
        commands: {
            dev: 'vite',
            build: 'vite build',
        },
    },
    navigationBar: {
        withBackButton: true,
        withHomeButton: false,
    },
    permissions: [],
});
