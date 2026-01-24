# 이곡어때 - 노래방 추천 앱

노래방에서 지금 상황에 딱 맞는 노래를 추천해주는 웹 앱입니다.

## 📌 프로젝트 개요

### 서비스 목적
- 노래 실력과 무관하게 누구나 부담 없이 곡 선택 가능
- 분위기를 망치지 않는 곡 선택 지원
- 프로필 기반 개인화된 추천

### 핵심 기능
1. **프로필 입력**: 연령대, 성별, 방문 빈도, 선호 장르
2. **사용 목적 선택**: 노래 선택 어려움, 분위기 파악, 새로운 곡, 함께 부를 곡, 분위기 띄우기
3. **분위기 선택**: 신나게 띄우기, 잔잔하게, 감성 충전, 흥겨운 떼창
4. **인원 & 성비 선택**: 혼자/2명/3명+, 남초/비슷/여초
5. **자리 유형 선택**: 직장 모임, 친구 모임, 연인·가족, 특별한 날
6. **피드백 시스템**: 평점, 추천 만족도, 기능 요청

## 🗂️ 파일 구조

```
project3/
├── index.html        # 메인 HTML (9개 화면 포함)
├── index.css         # 스타일 (Cyan/Blue 네온 테마)
├── app.js            # 앱 로직 (ES Module)
├── songs.js          # 노래 데이터베이스 (70+ 곡)
├── recommend.js      # 추천 알고리즘 (ES Module)
├── granite.config.ts # 앱인토스 설정
├── vite.config.js    # Vite 설정
├── package.json      # 의존성 설정
├── karaoke_app/      # 원본 소스 파일
├── dist/             # 빌드 결과물
├── CLAUDE.md         # 프로젝트 문서
└── recommend.md      # 알고리즘 설계 문서
```

## 🎨 UI 플로우

```
스플래시 (3초) → 프로필 입력 → 사용 목적 → 메인 홈
                                              ↓
피드백 ← 결과 ← 자리 유형 ← 인원/성비 ← 분위기 선택
```

### 화면 구성
1. **스플래시** - 앱 로딩 화면 (🎤 아이콘, 애니메이션)
2. **프로필** - 연령대, 성별, 방문 빈도, 선호 장르 선택
3. **사용 목적** - 앱 사용 이유 선택
4. **메인 홈** - 추천 시작 버튼, 최근 추천곡, 하단 네비게이션
5. **분위기 선택** - 원하는 분위기 4가지 중 선택
6. **인원 & 성비** - 인원 수와 성비 선택
7. **자리 유형** - 직장/친구/연인/축하 자리 선택
8. **추천 결과** - 5곡 추천, 다시 추천받기 버튼
9. **피드백** - 평점, 만족도, 기능 요청

## 🛠️ 기술 스택

- **Apps In Toss** - 웹 프레임워크 (@apps-in-toss/web-framework ^1.7.0)
- **Toss Design System** - @toss/tds-mobile ^2.2.1
- **Vite** - 번들러 (^6.0.0)
- **HTML5/CSS3/JS** - ES Module 구조
- **Google Fonts** - Noto Sans KR

## 🎨 디자인 테마

**Cyan/Blue 네온 테마**
- 메인 색상: `#22D3EE` (Cyan), `#3B82F6` (Blue)
- 배경: 다크 그라디언트 (`#0f172a` → `#1e293b`)
- 카드: 글래스모피즘 효과
- 애니메이션: 네온 글로우, 페이드인, 슬라이드업

## ⚙️ 앱인토스 설정 (granite.config.ts)

```typescript
{
    appName: 'joj-miniapp1',
    brand: {
        displayName: 'Hats',
        primaryColor: '#8B5CF6',
    },
    web: {
        host: 'localhost',
        port: 5173,
        commands: {
            dev: 'vite',
            build: 'vite build',
        },
    },
}
```

## 🚀 실행 방법

### 일반 웹 개발
```bash
npm run dev
# localhost:5173 접속
```

### 앱인토스 샌드박스 테스트
```bash
npm run ait:dev
# 앱인토스 샌드박스 앱에서 스킴 접속
```

## 📝 주요 로직

### 추천 알고리즘 (recommend.js)
- **태그 기반 분류**: 각 노래에 분위기, 난이도, 인원, 시간대, 상황 태그 부여
- **가중치 스코어링**: 상황(40) > 분위기(25) > 인원(20) > 시간대(15)
- **다양성 확보**: 상위 15곡 중 랜덤 셔플하여 5곡 추천

자세한 알고리즘 설명은 [recommend.md](./recommend.md) 참조

### 앱 클래스 구조 (app.js)
```javascript
class KaraokeApp {
    screens: ['splash', 'profile', 'purpose', 'home', 'mood', 'people', 'occasion', 'result', 'feedback']
    userData: { age, gender, frequency, genres, purpose, situation, groupSize, atmosphere, genderRatio, ... }
    
    // 주요 메서드
    showSplash()           // 스플래시 후 프로필로 이동
    goToScreen(index)      // 화면 전환
    handleSingleSelect()   // 단일 선택 처리
    handleGenreSelect()    // 장르 복수 선택
    showResults()          // 추천 결과 표시
    displayRecommendations() // 추천 노래 렌더링
}
```

### 데이터 품질
- 개발 모드에서 태그 검증을 수행하여 정의되지 않은 태그를 경고합니다.

## ⚙️ 확장 가능성

1. **노래 DB 확장**: `songs.js`에 곡 추가
2. **장르 다양화**: R&B, 힙합/랩 등 다양한 장르 보강
3. **사용자 히스토리**: 이전 추천 기록 저장
4. **번호 검색**: 노래방 번호 연동 (TJ, 금영 등)
5. **찜한곡 기능**: 홈 화면 하단 네비게이션에 찜한곡 탭 활성화
