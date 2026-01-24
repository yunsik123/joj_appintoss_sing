// 추천 알고리즘 모듈
// 사용자 선택 조건에 맞는 노래를 추천합니다

export class SongRecommender {
    constructor(songs) {
        this.songs = songs;
    }

    /**
     * 사용자 선택에 맞는 노래를 추천합니다
     * @param {Object} userSelection - 사용자 선택 정보
     * @param {string} userSelection.situation - 상황 (opening, heating, closing, mood_change)
     * @param {string} userSelection.groupSize - 인원 (solo, duo, group)
     * @param {string} userSelection.atmosphere - 분위기 유형 (회식, 친구모임, 커플 등)
     * @param {string} userSelection.timeSlot - 시간대 (evening, night, dawn)
     * @param {number} count - 추천 곡 수 (기본 5곡)
     * @returns {Array} 추천된 노래 배열
     */
    recommend(userSelection, count = 5) {
        // 1. 모든 곡에 대해 점수 계산
        const scoredSongs = this.songs.map(song => ({
            song,
            score: this.calculateScore(song, userSelection)
        }));

        // 2. 점수순 정렬
        scoredSongs.sort((a, b) => b.score - a.score);

        // 3. 최소 점수 이상인 곡만 필터링
        const qualifiedSongs = scoredSongs.filter(item => item.score >= 20);

        // 4. 상위 곡들 중에서 랜덤으로 섞어서 다양성 확보
        const topSongs = qualifiedSongs.slice(0, Math.min(15, qualifiedSongs.length));
        this.shuffle(topSongs);

        // 5. 요청된 수만큼 반환
        return topSongs.slice(0, count).map(item => item.song);
    }

    /**
     * 노래의 적합도 점수를 계산합니다
     * 가중치: 상황(40) > 분위기(25) > 인원(20) > 시간대(15)
     */
    calculateScore(song, userSelection) {
        let score = 0;
        const weights = {
            situation: 40,
            mood: 25,
            groupSize: 20,
            timeSlot: 15
        };

        // 1. 상황 매칭 (가장 중요)
        if (song.tags.situation.includes(userSelection.situation)) {
            score += weights.situation;
        }

        // 2. 분위기 매칭 - atmosphere에 따른 선호 분위기 결정
        const preferredMoods = this.getPreferredMoods(userSelection.atmosphere);
        const moodMatchCount = song.tags.mood.filter(m => preferredMoods.includes(m)).length;
        score += (moodMatchCount / preferredMoods.length) * weights.mood;

        // 3. 인원 매칭
        if (song.tags.groupSize.includes(userSelection.groupSize)) {
            score += weights.groupSize;
        }

        // 4. 시간대 매칭
        if (song.tags.timeSlot.includes(userSelection.timeSlot)) {
            score += weights.timeSlot;
        }

        // 5. 보너스: 난이도가 쉬우면 추가 점수 (누구나 부를 수 있음)
        if (song.tags.difficulty === 'easy') {
            score += 5;
        } else if (song.tags.difficulty === 'medium') {
            score += 2;
        }

        return score;
    }

    /**
     * 분위기 유형에 따른 선호 mood 태그를 반환합니다
     */
    getPreferredMoods(atmosphere) {
        const moodMap = {
            '회식': ['energetic', 'fun'],           // 회식: 신나고 재미있는
            '친구모임': ['fun', 'energetic'],       // 친구: 재미있고 신나는
            '커플': ['calm', 'emotional'],          // 커플: 잔잔하고 감성적
            '동창회': ['fun', 'emotional'],         // 동창회: 추억 + 재미
            '가족모임': ['calm', 'fun'],            // 가족: 잔잔하고 재미있는
            '축하자리': ['energetic', 'fun']        // 축하: 신나고 재미있는
        };
        return moodMap[atmosphere] || ['fun', 'calm'];
    }

    /**
     * 배열을 랜덤하게 섞습니다 (Fisher-Yates 알고리즘)
     */
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * 특정 상황에 맞는 곡만 필터링합니다
     */
    filterBySituation(situation) {
        return this.songs.filter(song =>
            song.tags.situation.includes(situation)
        );
    }

    /**
     * 듀엣곡(커플용)만 필터링합니다
     */
    getDuetSongs() {
        return this.songs.filter(song =>
            song.tags.groupSize.includes('duo')
        );
    }
}