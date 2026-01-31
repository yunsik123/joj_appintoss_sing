# 노래 추천 알고리즘 설계 문서

## 📊 추천 방식 개요

CSV 데이터 기반 **필터링 + 폴백** 방식으로 사용자 선택에 맞는 노래를 추천합니다.

## 🎯 핵심 로직

### 1. 사용자 선택 데이터 구조

```javascript
{
    나이: '20대' | '30대' | ... | null,
    가수성별: '남' | '여' | null,
    장르: '발라드' | '댄스' | '힙합' | '락' | '트로트' | 'R&B' | null,
    분위기: '잔잔' | '달달' | '신나는' | '우울한' | '애절한' | null,
    인원수: '혼자' | '듀엣' | '그룹' | null,
    상황: '감성충전' | '분위기 띄우기' | '데이트' | '고음어필' | null
}
```

- `null` = "상관없음" 선택 시 해당 조건 무시

### 2. 3단계 폴백 전략

```javascript
recommend(userSelection, count = 5) {
    // 1단계: 엄격한 필터링 (모든 조건 AND)
    let filteredSongs = this.filterSongs(userSelection);

    // 2단계: 조건 완화 (5곡 미만일 때)
    if (filteredSongs.length < count) {
        filteredSongs = this.filterSongsRelaxed(userSelection);
    }

    // 3단계: 전체 DB (그래도 부족할 때)
    if (filteredSongs.length < count) {
        filteredSongs = [...this.songs];
    }

    // 4. 랜덤 셔플 (Fisher-Yates)
    this.shuffle(filteredSongs);

    // 5. 요청 개수만큼 반환
    return filteredSongs.slice(0, count);
}
```

## 🔍 각 단계 상세

### 1단계: 엄격한 필터링

모든 선택 조건을 AND로 결합하여 매칭:

```javascript
filterSongs(selection) {
    return this.songs.filter(song => {
        // 나이: 선택값이 노래의 나이 필드에 포함되는지
        if (selection.나이 && !song.나이.includes(selection.나이)) {
            return false;
        }
        
        // 가수성별: 선택값이 노래의 성별 필드에 포함되는지
        if (selection.가수성별 && !song.성별.includes(selection.가수성별)) {
            return false;
        }
        
        // 장르: 정확히 일치
        if (selection.장르 && song.장르 !== selection.장르) {
            return false;
        }
        
        // 분위기: 정확히 일치
        if (selection.분위기 && song.분위기 !== selection.분위기) {
            return false;
        }
        
        // 인원수: 정확히 일치
        if (selection.인원수 && song.인원수 !== selection.인원수) {
            return false;
        }
        
        // 상황: 정확히 일치
        if (selection.상황 && song.상황 !== selection.상황) {
            return false;
        }
        
        return true;
    });
}
```

**예시:**
- 선택: 20대 / 남자 / 댄스 / 신나는 / 그룹 / 분위기 띄우기
- 매칭: `Dynamite,방탄소년단,10대 20대,남,댄스,신나는,그룹,분위기 띄우기` ✅

### 2단계: 조건 완화 (핵심 조건만)

나이, 성별, 장르, 인원수를 무시하고 **분위기 + 상황**만 매칭:

```javascript
filterSongsRelaxed(selection) {
    return this.songs.filter(song => {
        // 분위기만 체크
        if (selection.분위기 && song.분위기 !== selection.분위기) {
            return false;
        }
        // 상황만 체크
        if (selection.상황 && song.상황 !== selection.상황) {
            return false;
        }
        return true;
    });
}
```

**이유:** 분위기와 상황이 노래 선택에서 가장 중요한 요소

### 3단계: 전체 DB

모든 조건을 무시하고 전체 250+ 곡에서 랜덤 선택

## 📈 실제 동작 예시

### 케이스 1: 충분한 데이터

**선택:** 20대 / 여자 / 댄스 / 신나는 / 그룹 / 분위기 띄우기

1. **1단계**: 조건 맞는 곡 50곡 발견 ✅
2. **셔플 후 5곡 반환**

### 케이스 2: 데이터 부족

**선택:** 50대+ / 여자 / 트로트 / 우울한 / 혼자 / 고음어필

1. **1단계**: 조건 맞는 곡 2곡 발견 → 부족 ❌
2. **2단계**: "우울한 + 고음어필" 조건으로 15곡 발견 ✅
3. **셔플 후 5곡 반환**

### 케이스 3: 극단적 부족

**선택:** 매우 특이한 조합

1. **1단계**: 0곡 ❌
2. **2단계**: 1곡 ❌
3. **3단계**: 전체 250+ 곡에서 랜덤 5곡 ✅

## 🎲 랜덤 셔플

Fisher-Yates 알고리즘 사용:

```javascript
shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
```

**효과:** 같은 조건으로 여러 번 추천받아도 다른 곡이 나옴

## 💡 장점

1. **항상 5곡 보장**: 어떤 조건이든 결과 제공
2. **유연한 매칭**: 데이터 부족 시 자동으로 조건 완화
3. **다양성 확보**: 랜덤 셔플로 매번 다른 추천
4. **빠른 성능**: 단순 필터링으로 즉시 결과 반환

## 🔧 확장 가능성

- 가중치 기반 스코어링 추가
- 사용자 선호도 학습
- 최근 추천 곡 제외 로직
- 난이도 필터 추가
