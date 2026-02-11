// 이곡어때 - 메인 앱 로직 (프로필 + 3단계 선택)
import { SONGS_DATABASE, TAGS, validateSongs } from './songs.js';
import { SongRecommender } from './recommend.js';

// Toast 알림 함수 (시스템 alert 대체)
function showToast(message, duration = 3000) {
    // 기존 toast 제거
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Toast 요소 생성
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // 애니메이션 시작
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // 자동으로 사라짐
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

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
            'splash',            // 0
            'profile',           // 1 - 프로필 (유저성별, 유저나이, 방문빈도, 선호장르)
            'age-gender',        // 2 - 나이 + 가수성별
            'genre-mood',        // 3 - 장르 + 분위기
            'people-situation',  // 4 - 인원수 + 상황
            'result'             // 5 - 결과
        ];

        this.currentScreen = 0;

        // 사용자 데이터
        this.userData = {
            // 프로필 (참고용, 추천에는 미사용)
            유저성별: null,
            유저나이: null,
            방문빈도: null,
            선호장르: [],

            // 추천 조건 (CSV 매칭용)
            나이: null,
            가수성별: null,
            장르: null,
            분위기: null,
            인원수: null,
            상황: null
        };

        // 이미 추천된 곡 목록 (중복 방지용)
        this.recommendedSongs = [];

        this.init();
    }

    init() {
        this.bindEvents();
        this.handleDeepLink();
    }

    // 딥링크 처리 (intoss://joj-miniapp1/screenName)
    handleDeepLink() {
        const path = window.location.pathname.replace(/^\//, '');
        const hash = window.location.hash.replace(/^#\/?/, '');
        const route = path || hash;

        switch (route) {
            case 'recommend':
            case 'profile':
                // 프로필 입력 화면으로 이동
                this.goToScreen(1);
                break;
            case 'age-gender':
                // 나이 + 가수성별 선택 화면으로 이동
                this.goToScreen(2);
                break;
            case 'genre-mood':
                // 장르 + 분위기 선택 화면으로 이동
                this.goToScreen(3);
                break;
            case 'people-situation':
                // 인원수 + 상황 선택 화면으로 이동
                this.goToScreen(4);
                break;
            case 'result':
                // 결과 화면으로 이동
                this.goToScreen(5);
                break;
            default:
                // 기본: 스플래시부터 시작
                this.showSplash();
                break;
        }
    }

    bindEvents() {
        // 단일 선택 버튼들 (option-btn)
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSingleSelect(e));
        });

        // 복수 선택 버튼들 (genre-tag)
        document.querySelectorAll('.genre-tag').forEach(tag => {
            tag.addEventListener('click', (e) => this.handleGenreSelect(e));
        });

        // 다음 버튼들
        document.getElementById('btn-profile-next')?.addEventListener('click', () => {
            if (this.validateProfile()) {
                this.goToScreen(2); // age-gender
            }
        });

        document.getElementById('btn-age-gender-next')?.addEventListener('click', () => {
            if (this.validateAgeGender()) {
                this.goToScreen(3); // genre-mood
            }
        });

        document.getElementById('btn-genre-mood-next')?.addEventListener('click', () => {
            if (this.validateGenreMood()) {
                this.goToScreen(4); // people-situation
            }
        });

        document.getElementById('btn-people-situation-next')?.addEventListener('click', () => {
            if (this.validatePeopleSituation()) {
                this.showResults();
            }
        });

        // 뒤로가기 버튼들
        document.getElementById('btn-age-gender-back')?.addEventListener('click', () => {
            this.goToScreen(1); // profile
        });

        document.getElementById('btn-genre-mood-back')?.addEventListener('click', () => {
            this.goToScreen(2); // age-gender
        });

        document.getElementById('btn-people-situation-back')?.addEventListener('click', () => {
            this.goToScreen(3); // genre-mood
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
            this.goToScreen(1); // profile
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

    // 단일 선택 처리
    handleSingleSelect(e) {
        const btn = e.currentTarget;
        const field = btn.dataset.field;
        const value = btn.dataset.value;

        // 같은 필드의 다른 버튼 선택 해제
        const section = btn.closest('.input-section');
        section.querySelectorAll(`[data-field="${field}"]`).forEach(b => {
            b.classList.remove('selected');
        });

        // 현재 버튼 선택
        btn.classList.add('selected');
        this.userData[field] = value === 'null' ? null : value;
    }

    // 장르 복수 선택 처리
    handleGenreSelect(e) {
        const tag = e.currentTarget;
        const value = tag.dataset.value;

        tag.classList.toggle('selected');

        if (tag.classList.contains('selected')) {
            if (!this.userData.선호장르.includes(value)) {
                this.userData.선호장르.push(value);
            }
        } else {
            this.userData.선호장르 = this.userData.선호장르.filter(g => g !== value);
        }
    }

    // 프로필 검증
    validateProfile() {
        if (!this.userData.유저성별) {
            showToast('성별을 선택해주세요');
            return false;
        }
        if (!this.userData.유저나이) {
            showToast('연령대를 선택해주세요');
            return false;
        }
        if (!this.userData.방문빈도) {
            showToast('방문 빈도를 선택해주세요');
            return false;
        }
        return true;
    }

    // 나이+가수성별 검증
    validateAgeGender() {
        if (this.userData.나이 === undefined) {
            showToast('노래 연령대를 선택해주세요');
            return false;
        }
        if (this.userData.가수성별 === undefined) {
            showToast('가수 성별을 선택해주세요');
            return false;
        }
        return true;
    }

    // 장르+분위기 검증
    validateGenreMood() {
        if (this.userData.장르 === undefined) {
            showToast('장르를 선택해주세요');
            return false;
        }
        if (this.userData.분위기 === undefined) {
            showToast('분위기를 선택해주세요');
            return false;
        }
        return true;
    }

    // 인원수+상황 검증
    validatePeopleSituation() {
        if (this.userData.인원수 === undefined) {
            showToast('인원수를 선택해주세요');
            return false;
        }
        if (this.userData.상황 === undefined) {
            showToast('상황을 선택해주세요');
            return false;
        }
        return true;
    }

    // 결과 표시
    showResults() {
        this.goToScreen(5); // result

        // 선택 조건 태그 표시
        this.displayTags();

        // 추천 노래 표시
        this.displayRecommendations();
    }

    // 선택 조건 태그 표시
    displayTags() {
        const tagsContainer = document.getElementById('resultTags');

        const tags = [];
        if (this.userData.나이) tags.push(this.userData.나이);
        if (this.userData.가수성별) tags.push(this.userData.가수성별 === '남' ? '남자가수' : '여자가수');
        if (this.userData.장르) tags.push(this.userData.장르);
        if (this.userData.분위기) tags.push(this.userData.분위기);
        if (this.userData.인원수) tags.push(this.userData.인원수);
        if (this.userData.상황) tags.push(this.userData.상황);

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

        // 추천 받기 (CSV 매칭용 필드만 사용)
        const selection = {
            나이: this.userData.나이,
            가수성별: this.userData.가수성별,
            장르: this.userData.장르,
            분위기: this.userData.분위기,
            인원수: this.userData.인원수,
            상황: this.userData.상황
        };

        console.log('[추천 조건]', selection);
        console.log('[제외 목록]', this.recommendedSongs);

        // 이전에 추천된 곡 제외하고 추천
        const recommendations = recommender.recommend(selection, 5, this.recommendedSongs);

        console.log('[추천 결과]', recommendations);

        // 추천된 곡 목록에 추가
        recommendations.forEach(song => {
            if (!this.recommendedSongs.includes(song.title)) {
                this.recommendedSongs.push(song.title);
            }
        });

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
            유저성별: null,
            유저나이: null,
            방문빈도: null,
            선호장르: [],
            나이: null,
            가수성별: null,
            장르: null,
            분위기: null,
            인원수: null,
            상황: null
        };

        // 추천된 곡 목록 초기화
        this.recommendedSongs = [];

        // 선택 표시 해제
        document.querySelectorAll('.option-btn, .genre-tag, .selection-card').forEach(el => {
            el.classList.remove('selected');
        });

        // 첫 화면으로
        this.goToScreen(1); // profile
    }
}

// 앱 시작
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new KaraokeApp();
});