// 이곡어때 - 메인 앱 로직
import { SONGS_DATABASE, TAGS, validateSongs } from './songs.js';
import { SongRecommender } from './recommend.js';

const recommender = new SongRecommender(SONGS_DATABASE);

// 개발 환경에서 노래 데이터 검증
if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
    const issues = validateSongs(SONGS_DATABASE);
    if (issues.length > 0) {
        console.warn(`[songs] 태그 검증 이슈:\n${issues.join('\n')}`);
    }
}

class KaraokeApp {
    constructor() {
        // 화면 순서 정의
        this.screens = [
            'splash',      // 0
            'profile',     // 1
            'purpose',     // 2
            'home',        // 3
            'mood',        // 4
            'people',      // 5
            'occasion',    // 6
            'result',      // 7
            'feedback'     // 8
        ];
        
        this.currentScreen = 0;
        
        // 사용자 데이터 수집
        this.userData = {
            // 프로필 정보
            age: null,
            gender: null,
            frequency: null,
            genres: [],
            
            // 사용 목적
            purpose: null,
            
            // 추천 조건
            situation: null,      // mood 화면에서 선택 (기존 상황과 매핑)
            groupSize: null,      // people 화면에서 선택
            atmosphere: null,     // occasion 화면에서 선택
            genderRatio: null,    // people 화면에서 선택
            
            // 시간대 (자동 설정)
            timeSlot: this.getTimeSlot(),
            
            // 피드백
            rating: 0,
            feedbackType: [],
            feedbackText: '',
            features: []
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.showSplash();
    }

    bindEvents() {
        // 프로필 화면 - 단일 선택 버튼
        document.querySelectorAll('#screen-profile .option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSingleSelect(e));
        });

        // 프로필 화면 - 장르 복수 선택
        document.querySelectorAll('.genre-tag').forEach(tag => {
            tag.addEventListener('click', (e) => this.handleGenreSelect(e));
        });

        // 프로필 다음 버튼
        document.getElementById('btn-profile-next').addEventListener('click', () => {
            if (this.validateProfile()) {
                this.goToScreen(2); // 사용 목적
            }
        });

        // 사용 목적 선택
        document.querySelectorAll('.purpose-card').forEach(card => {
            card.addEventListener('click', (e) => this.handlePurposeSelect(e));
        });

        // 사용 목적 뒤로가기
        document.getElementById('btn-purpose-back').addEventListener('click', () => {
            this.goToScreen(1);
        });

        // 메인 홈 - 추천 시작
        document.getElementById('btn-start-recommend').addEventListener('click', () => {
            this.goToScreen(4); // 분위기 선택
        });

        // 분위기 선택
        document.querySelectorAll('.mood-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleMoodSelect(e));
        });

        document.getElementById('btn-mood-back').addEventListener('click', () => {
            this.goToScreen(3);
        });

        // 인원 & 성비 선택
        document.querySelectorAll('#screen-people .people-card, #screen-people .gender-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleSingleSelect(e));
        });

        document.getElementById('btn-people-next').addEventListener('click', () => {
            if (this.userData.groupSize && this.userData.genderRatio) {
                this.goToScreen(6); // 자리 유형
            }
        });

        document.getElementById('btn-people-back').addEventListener('click', () => {
            this.goToScreen(4);
        });

        // 자리 유형 선택
        document.querySelectorAll('.occasion-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleOccasionSelect(e));
        });

        document.getElementById('btn-occasion-back').addEventListener('click', () => {
            this.goToScreen(5);
        });

        // 결과 화면
        document.getElementById('btn-retry').addEventListener('click', () => {
            this.showResults();
        });

        document.getElementById('btn-feedback').addEventListener('click', () => {
            this.goToScreen(8); // 피드백
        });

        // 피드백 화면
        document.querySelectorAll('.star-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleRating(e));
        });

        document.querySelectorAll('#screen-feedback .feedback-tag').forEach(tag => {
            tag.addEventListener('click', (e) => this.handleFeedbackTag(e));
        });

        document.getElementById('btn-submit-feedback').addEventListener('click', () => {
            this.submitFeedback();
        });

        document.getElementById('btn-skip-feedback').addEventListener('click', () => {
            this.goToScreen(3); // 홈으로
        });
    }

    // 스플래시 화면 표시 (3초 후 자동 이동)
    showSplash() {
        this.goToScreen(0);
        setTimeout(() => {
            this.goToScreen(1); // 프로필 입력으로
        }, 3000);
    }

    // 화면 전환
    goToScreen(screenIndex) {
        // 현재 화면 숨기기
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // 새 화면 표시
        const screenName = this.screens[screenIndex];
        document.getElementById(`screen-${screenName}`).classList.add('active');
        
        this.currentScreen = screenIndex;

        // 진행률 업데이트
        this.updateProgress(screenIndex);
    }

    // 진행률 표시 업데이트
    updateProgress(screenIndex) {
        const progressScreens = [1, 2, 4, 5, 6]; // 프로필, 목적, 분위기, 인원, 자리유형
        
        if (!progressScreens.includes(screenIndex)) return;

        const screen = document.getElementById(`screen-${this.screens[screenIndex]}`);
        const dots = screen.querySelectorAll('.progress-dots .dot');
        
        if (!dots.length) return;

        // 각 화면별 진행률 설정
        const progressMap = {
            1: 1,  // 프로필 (1/3)
            2: 2,  // 목적 (2/3)
            4: 1,  // 분위기 (1/3)
            5: 2,  // 인원 (2/3)
            6: 3   // 자리유형 (3/3)
        };

        const activeCount = progressMap[screenIndex] || 0;
        
        dots.forEach((dot, index) => {
            if (index < activeCount) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // 단일 선택 처리
    handleSingleSelect(e) {
        const btn = e.currentTarget;
        const field = btn.dataset.field;
        const value = btn.dataset.value;

        // 같은 필드의 다른 버튼 선택 해제
        const parent = btn.closest('.input-section') || btn.closest('.screen');
        parent.querySelectorAll(`[data-field="${field}"]`).forEach(b => {
            b.classList.remove('selected');
        });

        // 현재 버튼 선택
        btn.classList.add('selected');
        this.userData[field] = value;
    }

    // 장르 복수 선택 처리
    handleGenreSelect(e) {
        const tag = e.currentTarget;
        const value = tag.dataset.value;

        tag.classList.toggle('selected');

        if (tag.classList.contains('selected')) {
            if (!this.userData.genres.includes(value)) {
                this.userData.genres.push(value);
            }
        } else {
            this.userData.genres = this.userData.genres.filter(g => g !== value);
        }
    }

    // 프로필 검증
    validateProfile() {
        const { age, gender, frequency, genres } = this.userData;
        
        if (!age || !gender || !frequency) {
            alert('모든 필수 항목을 선택해주세요.');
            return false;
        }

        if (genres.length === 0) {
            alert('선호 장르를 최소 1개 이상 선택해주세요.');
            return false;
        }

        return true;
    }

    // 사용 목적 선택
    handlePurposeSelect(e) {
        const card = e.currentTarget;
        const value = card.dataset.value;

        // 다른 카드 선택 해제
        document.querySelectorAll('.purpose-card').forEach(c => {
            c.classList.remove('selected');
        });

        card.classList.add('selected');
        this.userData.purpose = value;

        // 잠시 후 다음 화면으로
        setTimeout(() => {
            this.goToScreen(3); // 메인 홈
        }, 300);
    }

    // 분위기 선택 (situation 매핑)
    handleMoodSelect(e) {
        const card = e.currentTarget;
        const value = card.dataset.value;

        document.querySelectorAll('.mood-card').forEach(c => {
            c.classList.remove('selected');
        });

        card.classList.add('selected');
        this.userData.situation = value;

        setTimeout(() => {
            this.goToScreen(5); // 인원 & 성비
        }, 300);
    }

    // 자리 유형 선택
    handleOccasionSelect(e) {
        const card = e.currentTarget;
        const value = card.dataset.value;

        document.querySelectorAll('.occasion-card').forEach(c => {
            c.classList.remove('selected');
        });

        card.classList.add('selected');
        this.userData.atmosphere = value;

        setTimeout(() => {
            this.showResults();
        }, 300);
    }

    // 결과 표시
    showResults() {
        this.goToScreen(7);

        // 선택 조건 태그 표시
        this.displayTags();

        // 추천 노래 표시
        this.displayRecommendations();
    }

    // 선택 조건 태그 표시
    displayTags() {
        const tagsContainer = document.getElementById('resultTags');
        
        const situationLabel = {
            'heating': '신나게 띄우기',
            'opening': '잔잔하게',
            'closing': '감성 충전',
            'mood_change': '흥겨운 떼창'
        }[this.userData.situation] || this.userData.situation;

        const tags = [
            situationLabel,
            TAGS.groupSize[this.userData.groupSize],
            this.userData.genderRatio,
            this.userData.atmosphere
        ];

        tagsContainer.innerHTML = tags.map(tag => 
            `<span class="result-tag">${tag}</span>`
        ).join('');
    }

    // 추천 노래 표시
    displayRecommendations() {
        const resultList = document.getElementById('resultList');

        // 추천 받기
        const selection = {
            situation: this.userData.situation,
            groupSize: this.userData.groupSize,
            atmosphere: this.userData.atmosphere,
            timeSlot: this.userData.timeSlot
        };

        const recommendations = recommender.recommend(selection, 5);

        // 결과 표시
        resultList.innerHTML = recommendations.map((song, index) => `
            <div class="result-item">
                <div class="result-number">${index + 1}</div>
                <div class="result-info">
                    <div class="result-song-title">${song.title}</div>
                    <div class="result-artist">${song.artist}</div>
                </div>
            </div>
        `).join('');
    }

    // 평점 선택
    handleRating(e) {
        const btn = e.currentTarget;
        const rating = parseInt(btn.dataset.rating);

        // 선택한 별까지 모두 선택
        document.querySelectorAll('.star-btn').forEach((star, index) => {
            if (index < rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });

        this.userData.rating = rating;
    }

    // 피드백 태그 선택
    handleFeedbackTag(e) {
        const tag = e.currentTarget;
        const value = tag.dataset.value;
        const field = tag.closest('.input-section').querySelector('.input-label').textContent;

        tag.classList.toggle('selected');

        // 추천 결과 평가
        if (field.includes('추천 결과')) {
            if (tag.classList.contains('selected')) {
                if (!this.userData.feedbackType.includes(value)) {
                    this.userData.feedbackType.push(value);
                }
            } else {
                this.userData.feedbackType = this.userData.feedbackType.filter(t => t !== value);
            }
        }

        // 기능 요청
        if (field.includes('기능')) {
            if (tag.classList.contains('selected')) {
                if (!this.userData.features.includes(value)) {
                    this.userData.features.push(value);
                }
            } else {
                this.userData.features = this.userData.features.filter(f => f !== value);
            }
        }
    }

    // 피드백 제출
    submitFeedback() {
        this.userData.feedbackText = document.getElementById('feedbackText').value;

        // 콘솔에 수집된 데이터 출력 (실제로는 서버로 전송)
        console.log('=== 수집된 사용자 데이터 ===');
        console.log(this.userData);

        alert('소중한 의견 감사합니다! 🙏');
        
        // 홈으로 이동
        this.goToScreen(3);
    }

    // 현재 시간대 계산
    getTimeSlot() {
        const hour = new Date().getHours();
        
        if (hour >= 18 && hour < 21) {
            return 'evening'; // 저녁
        } else if (hour >= 21 || hour < 6) {
            return 'night';   // 밤
        } else {
            return 'dawn';    // 새벽 (실제로는 낮 시간도 포함)
        }
    }
}

// 앱 시작
document.addEventListener('DOMContentLoaded', () => {
    new KaraokeApp();
});