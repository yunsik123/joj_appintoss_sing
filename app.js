// 이곡어때 - 메인 앱 로직 (CSV 기반)
import { SONGS_DATABASE, TAGS, validateSongs } from './songs.js';
import { SongRecommender } from './recommend.js';

const recommender = new SongRecommender(SONGS_DATABASE);

// 개발 환경에서 노래 데이터 검증
if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
    const issues = validateSongs(SONGS_DATABASE);
    if (issues.length > 0) {
        console.warn(`[songs] 태그 검증 이슈:\n${issues.slice(0, 10).join('\n')}`);
    }
    console.log(`[songs] 총 ${SONGS_DATABASE.length}곡 로드됨`);
}

class KaraokeApp {
    constructor() {
        // 화면 순서 정의
        this.screens = [
            'splash',      // 0
            'age',         // 1 - 나이
            'gender',      // 2 - 가수 성별
            'genre',       // 3 - 장르
            'mood',        // 4 - 분위기
            'people',      // 5 - 인원수
            'situation',   // 6 - 상황
            'result'       // 7 - 결과
        ];

        this.currentScreen = 0;

        // 사용자 선택 데이터
        this.userData = {
            나이: null,
            가수성별: null,
            장르: null,
            분위기: null,
            인원수: null,
            상황: null
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.showSplash();
    }

    bindEvents() {
        // 모든 선택 카드에 이벤트 바인딩
        document.querySelectorAll('.selection-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleCardSelect(e));
        });

        // 뒤로가기 버튼들
        document.getElementById('btn-gender-back')?.addEventListener('click', () => {
            this.goToScreen(1);
        });

        document.getElementById('btn-genre-back')?.addEventListener('click', () => {
            this.goToScreen(2);
        });

        document.getElementById('btn-mood-back')?.addEventListener('click', () => {
            this.goToScreen(3);
        });

        document.getElementById('btn-people-back')?.addEventListener('click', () => {
            this.goToScreen(4);
        });

        document.getElementById('btn-situation-back')?.addEventListener('click', () => {
            this.goToScreen(5);
        });

        // 결과 화면 버튼들
        document.getElementById('btn-retry')?.addEventListener('click', () => {
            this.showResults();
        });

        document.getElementById('btn-restart')?.addEventListener('click', () => {
            this.resetAndRestart();
        });
    }

    // 스플래시 화면 표시 (클릭하면 이동)
    showSplash() {
        this.goToScreen(0);

        // 스플래시 화면 클릭 시 다음으로
        const splashScreen = document.getElementById('screen-splash');
        const splashClickHandler = () => {
            this.goToScreen(1); // 나이 선택으로
            splashScreen.removeEventListener('click', splashClickHandler);
        };
        splashScreen.addEventListener('click', splashClickHandler);
    }

    // 화면 전환
    goToScreen(screenIndex) {
        // 현재 화면 숨기기
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // 새 화면 표시
        const screenName = this.screens[screenIndex];
        const screenElement = document.getElementById(`screen-${screenName}`);
        if (screenElement) {
            screenElement.classList.add('active');
        }

        this.currentScreen = screenIndex;
    }

    // 카드 선택 처리
    handleCardSelect(e) {
        const card = e.currentTarget;
        const field = card.dataset.field;
        const value = card.dataset.value;

        // 같은 화면의 다른 카드 선택 해제
        const screen = card.closest('.screen');
        screen.querySelectorAll('.selection-card').forEach(c => {
            c.classList.remove('selected');
        });

        // 현재 카드 선택
        card.classList.add('selected');

        // 값 저장 (null 문자열이면 실제 null로)
        this.userData[field] = value === 'null' ? null : value;

        // 다음 화면으로 이동
        setTimeout(() => {
            this.moveToNextScreen();
        }, 300);
    }

    // 다음 화면으로 이동
    moveToNextScreen() {
        const nextScreen = this.currentScreen + 1;

        // 마지막 선택(상황) 후 결과 표시
        if (nextScreen >= this.screens.length - 1) {
            this.showResults();
        } else {
            this.goToScreen(nextScreen);
        }
    }

    // 결과 표시
    showResults() {
        this.goToScreen(7); // result

        // 선택 조건 태그 표시
        this.displayTags();

        // 추천 노래 표시
        this.displayRecommendations();
    }

    // 선택 조건 태그 표시
    displayTags() {
        const tagsContainer = document.getElementById('resultTags');

        const tagLabels = {
            나이: this.userData.나이 || '모든 연령',
            가수성별: this.userData.가수성별 ? (this.userData.가수성별 === '남' ? '남자가수' : '여자가수') : '모든 가수',
            장르: this.userData.장르 || '모든 장르',
            분위기: this.userData.분위기 || '모든 분위기',
            인원수: this.userData.인원수 || '모든 인원',
            상황: this.userData.상황 || '모든 상황'
        };

        const tags = Object.values(tagLabels).filter(v => !v.startsWith('모든'));

        if (tags.length === 0) {
            tagsContainer.innerHTML = '<span class="result-tag">모든 조건</span>';
        } else {
            tagsContainer.innerHTML = tags.map(tag =>
                `<span class="result-tag">${tag}</span>`
            ).join('');
        }
    }

    // 추천 노래 표시
    displayRecommendations() {
        const resultList = document.getElementById('resultList');

        // 추천 받기
        const recommendations = recommender.recommend(this.userData, 5);

        // 결과 표시
        resultList.innerHTML = recommendations.map((song, index) => `
            <div class="result-item">
                <div class="result-number">${index + 1}</div>
                <div class="result-info">
                    <div class="result-song-title">${song.title}</div>
                    <div class="result-artist">${song.artist}</div>
                </div>
                <div class="result-tags-small">
                    <span class="tag-small">${song.장르}</span>
                    <span class="tag-small">${song.분위기}</span>
                </div>
            </div>
        `).join('');
    }

    // 처음부터 다시 시작
    resetAndRestart() {
        // 선택 초기화
        this.userData = {
            나이: null,
            가수성별: null,
            장르: null,
            분위기: null,
            인원수: null,
            상황: null
        };

        // 선택 표시 해제
        document.querySelectorAll('.selection-card').forEach(card => {
            card.classList.remove('selected');
        });

        // 첫 화면으로
        this.goToScreen(1);
    }
}

// 앱 시작
document.addEventListener('DOMContentLoaded', () => {
    new KaraokeApp();
});