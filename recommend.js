// 추천 알고리즘 모듈 - CSV 데이터 기반 필터링
// 사용자 선택 조건에 맞는 노래를 필터링하여 추천합니다

export class SongRecommender {
    constructor(songs) {
        this.songs = songs;
    }

    /**
     * 사용자 선택에 맞는 노래를 추천합니다
     * @param {Object} userSelection - 사용자 선택 정보
     * @param {string|null} userSelection.나이 - 10대, 20대, 30대, 40대, 50대+ 또는 null(상관없음)
     * @param {string|null} userSelection.가수성별 - 남, 여 또는 null(상관없음)
     * @param {string|null} userSelection.장르 - 발라드, 힙합, 댄스, 락, 트로트, R&B 또는 null
     * @param {string|null} userSelection.분위기 - 잔잔, 달달, 신나는, 우울한, 애절한 또는 null
     * @param {string|null} userSelection.인원수 - 혼자, 듀엣, 그룹 또는 null
     * @param {string|null} userSelection.상황 - 감성충전, 분위기 띄우기, 데이트, 고음어필 또는 null
     * @param {number} count - 추천 곡 수 (기본 5곡)
     * @returns {Array} 추천된 노래 배열
     */
    recommend(userSelection, count = 5) {
        // 1. 조건에 맞는 노래 필터링
        let filteredSongs = this.filterSongs(userSelection);

        // 2. 매칭되는 곡이 충분하지 않으면 조건 완화
        if (filteredSongs.length < count) {
            filteredSongs = this.filterSongsRelaxed(userSelection);
        }

        // 3. 그래도 부족하면 전체에서 랜덤
        if (filteredSongs.length < count) {
            filteredSongs = [...this.songs];
        }

        // 4. 랜덤 셔플
        this.shuffle(filteredSongs);

        // 5. 요청된 수만큼 반환
        return filteredSongs.slice(0, count);
    }

    /**
     * 모든 조건을 AND로 필터링
     */
    filterSongs(selection) {
        return this.songs.filter(song => {
            // 나이 조건: 선택한 나이가 노래의 나이 태그에 포함되어야 함
            if (selection.나이 && !song.나이.includes(selection.나이)) {
                return false;
            }

            // 가수 성별 조건
            if (selection.가수성별 && !song.성별.includes(selection.가수성별)) {
                return false;
            }

            // 장르 조건
            if (selection.장르 && song.장르 !== selection.장르) {
                return false;
            }

            // 분위기 조건
            if (selection.분위기 && song.분위기 !== selection.분위기) {
                return false;
            }

            // 인원수 조건
            if (selection.인원수 && song.인원수 !== selection.인원수) {
                return false;
            }

            // 상황 조건
            if (selection.상황 && song.상황 !== selection.상황) {
                return false;
            }

            return true;
        });
    }

    /**
     * 조건 완화 필터링 (분위기와 상황만 필수)
     */
    filterSongsRelaxed(selection) {
        return this.songs.filter(song => {
            // 핵심 조건만 체크
            if (selection.분위기 && song.분위기 !== selection.분위기) {
                return false;
            }
            if (selection.상황 && song.상황 !== selection.상황) {
                return false;
            }
            return true;
        });
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