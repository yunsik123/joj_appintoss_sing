// 추천 알고리즘 모듈 - 우선순위 기반 점수 매칭
// 분위기와 상황을 우선시하고, 나머지 조건은 부가 점수로 활용

export class SongRecommender {
    constructor(songs) {
        this.songs = songs;

        // 조건별 가중치 (중요도 순)
        this.weights = {
            분위기: 40,    // 가장 중요
            상황: 35,      // 두 번째로 중요
            장르: 10,
            인원수: 8,
            나이: 4,
            가수성별: 3
        };
    }

    /**
     * 사용자 선택에 맞는 노래를 추천합니다 (점수 기반)
     * @param {Object} userSelection - 사용자 선택 정보
     * @param {string|null} userSelection.나이 - 10대, 20대, 30대, 40대, 50대+ 또는 null(상관없음)
     * @param {string|null} userSelection.가수성별 - 남, 여 또는 null(상관없음)
     * @param {string|null} userSelection.장르 - 발라드, 힙합, 댄스, 락, 트로트, R&B 또는 null
     * @param {string|null} userSelection.분위기 - 잔잔, 달달, 신나는, 우울한, 애절한 또는 null
     * @param {string|null} userSelection.인원수 - 혼자, 듀엣, 그룹 또는 null
     * @param {string|null} userSelection.상황 - 감성충전, 분위기 띄우기, 데이트, 고음어필 또는 null
     * @param {number} count - 추천 곡 수 (기본 5곡)
     * @param {Array} excludeList - 제외할 곡 제목 목록 (다시 추천받기 시 중복 방지)
     * @returns {Array} 추천된 노래 배열
     */
    recommend(userSelection, count = 5, excludeList = []) {
        // 1. 제외 목록을 제외한 곡들만 필터링
        let availableSongs = this.songs;
        if (excludeList.length > 0) {
            availableSongs = this.songs.filter(song =>
                !excludeList.includes(song.title)
            );
        }

        // 2. 모든 곡에 점수 부여
        const scoredSongs = availableSongs.map(song => ({
            song,
            score: this.calculateScore(song, userSelection)
        }));

        // 3. 점수순 정렬 (높은 점수 우선)
        scoredSongs.sort((a, b) => b.score - a.score);

        // 4. 최소 점수 필터링 (핵심 조건 중 하나라도 맞아야 함)
        const minScore = this.getMinimumScore(userSelection);
        const qualifiedSongs = scoredSongs.filter(item => item.score >= minScore);

        // 5. 상위 곡들 중에서 다양성을 위해 일부 랜덤 섞기 (30곡)
        const topCount = Math.min(count * 6, qualifiedSongs.length);
        const topSongs = qualifiedSongs.slice(0, topCount);
        this.shuffle(topSongs);

        // 6. 요청된 수만큼 반환
        return topSongs.slice(0, count).map(item => item.song);
    }

    /**
     * 노래의 점수를 계산합니다
     */
    calculateScore(song, selection) {
        let score = 0;

        // 분위기 매칭 (최우선)
        if (selection.분위기) {
            if (song.분위기 === selection.분위기) {
                score += this.weights.분위기;
            }
        }

        // 상황 매칭 (두 번째 우선순위)
        if (selection.상황) {
            if (song.상황 === selection.상황) {
                score += this.weights.상황;
            }
        }

        // 장르 매칭
        if (selection.장르) {
            if (song.장르 === selection.장르) {
                score += this.weights.장르;
            }
        }

        // 인원수 매칭
        if (selection.인원수) {
            if (song.인원수 === selection.인원수) {
                score += this.weights.인원수;
            }
        }

        // 나이 매칭 (포함 여부 체크)
        if (selection.나이) {
            if (song.나이.includes(selection.나이)) {
                score += this.weights.나이;
            }
        }

        // 가수 성별 매칭 (포함 여부 체크)
        if (selection.가수성별) {
            if (song.성별.includes(selection.가수성별)) {
                score += this.weights.가수성별;
            }
        }

        return score;
    }

    /**
     * 최소 점수 기준을 계산합니다
     * 핵심 조건(분위기 또는 상황) 중 하나라도 맞으면 통과
     */
    getMinimumScore(selection) {
        // 분위기나 상황이 선택되었다면, 둘 중 하나라도 맞아야 함
        if (selection.분위기 || selection.상황) {
            return Math.min(this.weights.분위기, this.weights.상황);
        }

        // 핵심 조건이 없으면 다른 조건이라도 하나 맞으면 OK
        return 3;
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
     * 모든 조건을 AND로 필터링 (기존 방식 - 호환성 유지)
     */
    filterSongs(selection) {
        return this.songs.filter(song => {
            if (selection.나이 && !song.나이.includes(selection.나이)) {
                return false;
            }
            if (selection.가수성별 && !song.성별.includes(selection.가수성별)) {
                return false;
            }
            if (selection.장르 && song.장르 !== selection.장르) {
                return false;
            }
            if (selection.분위기 && song.분위기 !== selection.분위기) {
                return false;
            }
            if (selection.인원수 && song.인원수 !== selection.인원수) {
                return false;
            }
            if (selection.상황 && song.상황 !== selection.상황) {
                return false;
            }
            return true;
        });
    }

    /**
     * 특정 장르의 곡만 필터링
     */
    filterByGenre(genre) {
        return this.songs.filter(song => song.장르 === genre);
    }

    /**
     * 특정 분위기의 곡만 필터링
     */
    filterByMood(mood) {
        return this.songs.filter(song => song.분위기 === mood);
    }

    /**
     * 특정 상황에 맞는 곡만 필터링
     */
    filterBySituation(situation) {
        return this.songs.filter(song => song.상황 === situation);
    }
}