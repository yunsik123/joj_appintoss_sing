# 노래 추천 알고리즘 설계 문서

## 📊 추천 방식 개요

**우선순위 기반 점수 매칭 시스템**으로 사용자 선택에 맞는 노래를 추천합니다.

## 🎯 핵심 로직

### 가중치 시스템

```javascript
weights = {
    분위기: 40,    // 최우선 (노래방에서 가장 중요)
    상황: 35,      // 두 번째 우선순위
    장르: 10,      // 보조 조건
    인원수: 8,     // 보조 조건
    나이: 4,       // 참고 조건
    가수성별: 3    // 참고 조건
}
```

**총점 100점 만점**

## 🔍 추천 프로세스

### 1. 점수 계산

모든 노래에 대해 선택 조건과의 매칭도를 점수화:

```javascript
calculateScore(song, selection) {
    let score = 0;
    
    // 분위기 매칭 (40점)
    if (selection.분위기 && song.분위기 === selection.분위기) {
        score += 40;
    }
    
    // 상황 매칭 (35점)
    if (selection.상황 && song.상황 === selection.상황) {
        score += 35;
    }
    
    // 장르 매칭 (10점)
    if (selection.장르 && song.장르 === selection.장르) {
        score += 10;
    }
    
    // 인원수 매칭 (8점)
    if (selection.인원수 && song.인원수 === selection.인원수) {
        score += 8;
    }
    
    // 나이 매칭 (4점) - 포함 여부
    if (selection.나이 && song.나이.includes(selection.나이)) {
        score += 4;
    }
    
    // 가수성별 매칭 (3점) - 포함 여부
    if (selection.가수성별 && song.성별.includes(selection.가수성별)) {
        score += 3;
    }
    
    return score;
}
```

### 2. 최소 점수 필터링

핵심 조건(분위기 또는 상황) 중 **하나라도 맞으면** 추천 대상:

```javascript
getMinimumScore(selection) {
    // 분위기나 상황이 선택되었다면
    if (selection.분위기 || selection.상황) {
        return 35; // 둘 중 하나라도 맞아야 함
    }
    
    // 핵심 조건이 없으면 다른 조건이라도 하나 맞으면 OK
    return 3;
}
```

### 3. 정렬 및 다양성 확보

```javascript
recommend(userSelection, count = 5) {
    // 1. 모든 곡 점수 계산
    const scoredSongs = songs.map(song => ({
        song,
        score: calculateScore(song, userSelection)
    }));
    
    // 2. 점수순 정렬 (높은 점수 우선)
    scoredSongs.sort((a, b) => b.score - a.score);
    
    // 3. 최소 점수 이상만 필터링
    const qualified = scoredSongs.filter(item => 
        item.score >= getMinimumScore(userSelection)
    );
    
    // 4. 상위 15곡(count * 3) 중에서 랜덤 섞기 (다양성)
    const topSongs = qualified.slice(0, count * 3);
    shuffle(topSongs);
    
    // 5. 5곡 반환
    return topSongs.slice(0, count);
}
```

## 📈 실제 동작 예시

### 케이스 1: 모든 조건 선택

**선택:** 20대 / 여자 / 댄스 / 신나는 / 그룹 / 분위기 띄우기

**점수 계산:**
- 완벽 매칭 곡: 40 + 35 + 10 + 8 + 4 + 3 = **100점**
- 분위기+상황만: 40 + 35 = **75점**
- 분위기만: **40점**

**결과:** 75점 이상 곡들 우선 추천

### 케이스 2: 핵심 조건만 선택

**선택:** 상관없음 / 상관없음 / 상관없음 / 신나는 / 상관없음 / 분위기 띄우기

**점수 계산:**
- 분위기+상황 매칭: 40 + 35 = **75점**
- 분위기만: **40점**
- 상황만: **35점**

**결과:** 35점 이상 곡들 추천 (핵심 조건 하나라도 맞으면 OK)

### 케이스 3: 부분 매칭

**선택:** 30대 / 남자 / 발라드 / 잔잔 / 혼자 / 감성충전

**곡 A:** 30대, 남자, 발라드, 잔잔, 혼자, 감성충전 → **100점** ✅
**곡 B:** 20대, 남자, 발라드, 잔잔, 혼자, 감성충전 → **96점** ✅
**곡 C:** 30대, 여자, 댄스, 잔잔, 듀엣, 감성충전 → **79점** ✅
**곡 D:** 40대, 남자, 힙합, 신나는, 그룹, 고음어필 → **7점** ❌

**결과:** A, B, C 순으로 추천 (상위 15곡 중 랜덤 5곡)

## 💡 장점

1. **유연한 매칭**: 모든 조건이 안 맞아도 핵심 조건만 맞으면 추천
2. **우선순위 명확**: 분위기와 상황이 가장 중요 (노래방 특성 반영)
3. **다양성 확보**: 상위 30곡 중 랜덤 선택으로 매번 다른 추천
4. **부분 매칭 지원**: 일부 조건만 맞아도 점수 부여
5. **항상 결과 보장**: 최소 점수 기준으로 항상 추천 가능
6. **중복 방지**: 다시 추천받기 시 이미 추천된 곡 제외

## 🔄 다시 추천받기 (중복 방지)

앱은 추천된 곡 목록을 추적하여 중복을 방지합니다:

```javascript
// app.js
this.recommendedSongs = []; // 추천 이력

// 추천 시 제외 목록 전달
const recommendations = recommender.recommend(
    selection, 
    5, 
    this.recommendedSongs  // 이전 추천 곡 제외
);

// 추천된 곡 이력에 추가
recommendations.forEach(song => {
    this.recommendedSongs.push(song.title);
});
```

**동작:**
- 1회 추천: 상위 30곡 중 5곡 (A, B, C, D, E)
- 2회 추천: A~E 제외, 나머지 25곡 중 5곡 (F, G, H, I, J)
- 3회 추천: A~J 제외, 나머지 20곡 중 5곡
- "처음부터" 버튼: 추천 이력 초기화

## 🔧 가중치 조정 가능

필요에 따라 `weights` 값을 조정하여 추천 로직 변경 가능:

```javascript
// 예: 장르를 더 중요하게
weights = {
    분위기: 35,
    상황: 30,
    장르: 20,  // 증가
    인원수: 8,
    나이: 4,
    가수성별: 3
}
```
