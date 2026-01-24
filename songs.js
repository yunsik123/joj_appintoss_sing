// 노래 데이터베이스
// 각 노래는 태그를 가지고 있어 상황에 맞는 추천이 가능합니다

export const SONGS_DATABASE = [
  // ===== 신나는 노래 (에너지 높음) =====
  {
    title: "Dynamite",
    artist: "BTS",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "medium",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["heating", "mood_change"]
    }
  },
  {
    title: "뿜뿜",
    artist: "모모랜드",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "easy",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["heating", "mood_change"]
    }
  },
  {
    title: "Ring Ding Dong",
    artist: "샤이니",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "medium",
      groupSize: ["group"],
      timeSlot: ["evening", "night"],
      situation: ["heating"]
    }
  },
  {
    title: "Gee",
    artist: "소녀시대",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "easy",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "heating"]
    }
  },
  {
    title: "Tell Me",
    artist: "원더걸스",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "easy",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "heating"]
    }
  },
  {
    title: "Cheer Up",
    artist: "트와이스",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "easy",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "heating"]
    }
  },
  {
    title: "빨간맛",
    artist: "레드벨벳",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "medium",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["heating"]
    }
  },
  {
    title: "강남스타일",
    artist: "싸이",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "easy",
      groupSize: ["group"],
      timeSlot: ["evening", "night"],
      situation: ["heating", "mood_change"]
    }
  },
  {
    title: "BANG BANG BANG",
    artist: "빅뱅",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "medium",
      groupSize: ["group"],
      timeSlot: ["night"],
      situation: ["heating"]
    }
  },
  {
    title: "DDU-DU DDU-DU",
    artist: "블랙핑크",
    tags: {
      mood: ["energetic"],
      difficulty: "medium",
      groupSize: ["group"],
      timeSlot: ["night"],
      situation: ["heating"]
    }
  },
  {
    title: "거북이",
    artist: "다비치",
    tags: {
      mood: ["fun", "calm"],
      difficulty: "easy",
      groupSize: ["solo", "duo"],
      timeSlot: ["evening", "night", "dawn"],
      situation: ["opening", "mood_change"]
    }
  },

  // ===== 회식/그룹용 떼창곡 =====
  {
    title: "아모르파티",
    artist: "김연자",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "easy",
      groupSize: ["group"],
      timeSlot: ["night", "dawn"],
      situation: ["heating", "closing"]
    }
  },
  {
    title: "눈의 꽃",
    artist: "박효신",
    tags: {
      mood: ["emotional", "calm"],
      difficulty: "hard",
      groupSize: ["solo"],
      timeSlot: ["night", "dawn"],
      situation: ["closing", "mood_change"]
    }
  },
  {
    title: "사랑안해",
    artist: "백지영",
    tags: {
      mood: ["emotional", "energetic"],
      difficulty: "hard",
      groupSize: ["solo", "duo"],
      timeSlot: ["night", "dawn"],
      situation: ["heating", "closing"]
    }
  },
  {
    title: "칵테일 사랑",
    artist: "김종국",
    tags: {
      mood: ["fun", "energetic"],
      difficulty: "medium",
      groupSize: ["solo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["heating"]
    }
  },
  {
    title: "미쳐",
    artist: "포미닛",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "medium",
      groupSize: ["duo", "group"],
      timeSlot: ["night"],
      situation: ["heating"]
    }
  },
  {
    title: "오빠 딱 좋아",
    artist: "유세윤",
    tags: {
      mood: ["fun"],
      difficulty: "easy",
      groupSize: ["group"],
      timeSlot: ["night", "dawn"],
      situation: ["heating", "mood_change"]
    }
  },
  {
    title: "불타오르네 (FIRE)",
    artist: "BTS",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "medium",
      groupSize: ["group"],
      timeSlot: ["night"],
      situation: ["heating"]
    }
  },
  {
    title: "촛불하나",
    artist: "g.o.d",
    tags: {
      mood: ["fun", "emotional"],
      difficulty: "easy",
      groupSize: ["group"],
      timeSlot: ["night", "dawn"],
      situation: ["mood_change", "closing"]
    }
  },

  // ===== 발라드/감성곡 =====
  {
    title: "사랑했지만",
    artist: "김광석",
    tags: {
      mood: ["emotional", "calm"],
      difficulty: "medium",
      groupSize: ["solo", "duo"],
      timeSlot: ["night", "dawn"],
      situation: ["closing", "mood_change"]
    }
  },
  {
    title: "겨울잠",
    artist: "아이유",
    tags: {
      mood: ["calm", "emotional"],
      difficulty: "medium",
      groupSize: ["solo"],
      timeSlot: ["dawn"],
      situation: ["closing"]
    }
  },
  {
    title: "첫눈처럼 너에게 가겠다",
    artist: "에일리",
    tags: {
      mood: ["emotional"],
      difficulty: "hard",
      groupSize: ["solo"],
      timeSlot: ["night", "dawn"],
      situation: ["closing"]
    }
  },
  {
    title: "봄날",
    artist: "BTS",
    tags: {
      mood: ["emotional", "calm"],
      difficulty: "medium",
      groupSize: ["solo", "duo", "group"],
      timeSlot: ["evening", "night", "dawn"],
      situation: ["closing", "mood_change"]
    }
  },
  {
    title: "야생화",
    artist: "박효신",
    tags: {
      mood: ["emotional"],
      difficulty: "hard",
      groupSize: ["solo"],
      timeSlot: ["night", "dawn"],
      situation: ["closing"]
    }
  },
  {
    title: "좋니",
    artist: "윤종신",
    tags: {
      mood: ["emotional", "calm"],
      difficulty: "easy",
      groupSize: ["solo", "duo"],
      timeSlot: ["night", "dawn"],
      situation: ["closing", "mood_change"]
    }
  },
  {
    title: "사랑하기 때문에",
    artist: "유재하",
    tags: {
      mood: ["emotional", "calm"],
      difficulty: "medium",
      groupSize: ["solo", "duo"],
      timeSlot: ["evening", "night"],
      situation: ["closing"]
    }
  },
  {
    title: "응급실",
    artist: "izi",
    tags: {
      mood: ["emotional"],
      difficulty: "hard",
      groupSize: ["solo"],
      timeSlot: ["night", "dawn"],
      situation: ["closing", "mood_change"]
    }
  },
  {
    title: "서시",
    artist: "신성우",
    tags: {
      mood: ["emotional", "calm"],
      difficulty: "medium",
      groupSize: ["solo", "group"],
      timeSlot: ["night", "dawn"],
      situation: ["closing", "mood_change"]
    }
  },

  // ===== R&B / 힙합 =====
  {
    title: "벌써 일년",
    artist: "브라운아이즈",
    tags: {
      mood: ["emotional", "calm"],
      difficulty: "medium",
      groupSize: ["solo", "duo"],
      timeSlot: ["night", "dawn"],
      situation: ["closing", "mood_change"]
    }
  },
  {
    title: "가지마 가지마",
    artist: "브라운아이즈",
    tags: {
      mood: ["emotional", "calm"],
      difficulty: "medium",
      groupSize: ["solo", "duo"],
      timeSlot: ["night", "dawn"],
      situation: ["closing", "mood_change"]
    }
  },
  {
    title: "나였으면",
    artist: "나얼",
    tags: {
      mood: ["emotional", "calm"],
      difficulty: "hard",
      groupSize: ["solo"],
      timeSlot: ["night", "dawn"],
      situation: ["closing"]
    }
  },
  {
    title: "No Make Up",
    artist: "Zion.T",
    tags: {
      mood: ["calm", "fun"],
      difficulty: "easy",
      groupSize: ["solo", "duo"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "mood_change"]
    }
  },
  {
    title: "꺼내 먹어요",
    artist: "Zion.T",
    tags: {
      mood: ["calm", "emotional"],
      difficulty: "easy",
      groupSize: ["solo", "duo"],
      timeSlot: ["night", "dawn"],
      situation: ["closing", "mood_change"]
    }
  },
  {
    title: "D (Half Moon)",
    artist: "DEAN",
    tags: {
      mood: ["calm", "emotional"],
      difficulty: "medium",
      groupSize: ["solo", "duo"],
      timeSlot: ["night", "dawn"],
      situation: ["mood_change", "closing"]
    }
  },
  {
    title: "instagram",
    artist: "DEAN",
    tags: {
      mood: ["calm", "emotional"],
      difficulty: "medium",
      groupSize: ["solo"],
      timeSlot: ["night", "dawn"],
      situation: ["mood_change"]
    }
  },
  {
    title: "아무노래",
    artist: "지코",
    tags: {
      mood: ["fun", "energetic"],
      difficulty: "easy",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "heating"]
    }
  },
  {
    title: "Okey Dokey",
    artist: "송민호, 지코",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "hard",
      groupSize: ["solo", "duo"],
      timeSlot: ["night"],
      situation: ["heating", "mood_change"]
    }
  },
  {
    title: "겁",
    artist: "송민호",
    tags: {
      mood: ["emotional", "energetic"],
      difficulty: "hard",
      groupSize: ["solo"],
      timeSlot: ["night"],
      situation: ["mood_change", "closing"]
    }
  },
  {
    title: "HER",
    artist: "블락비",
    tags: {
      mood: ["fun", "energetic"],
      difficulty: "medium",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "heating"]
    }
  },

  // ===== 첫 곡/오프닝용 =====
  {
    title: "나만 바라봐",
    artist: "태양",
    tags: {
      mood: ["fun", "energetic"],
      difficulty: "medium",
      groupSize: ["solo", "duo"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "heating"]
    }
  },
  {
    title: "Love Dive",
    artist: "아이브",
    tags: {
      mood: ["fun", "energetic"],
      difficulty: "medium",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "heating"]
    }
  },
  {
    title: "Hype Boy",
    artist: "뉴진스",
    tags: {
      mood: ["fun", "calm"],
      difficulty: "easy",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["opening"]
    }
  },
  {
    title: "Super Shy",
    artist: "뉴진스",
    tags: {
      mood: ["fun"],
      difficulty: "easy",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "heating"]
    }
  },
  {
    title: "인기",
    artist: "아이유",
    tags: {
      mood: ["fun", "calm"],
      difficulty: "easy",
      groupSize: ["solo", "duo"],
      timeSlot: ["evening", "night"],
      situation: ["opening"]
    }
  },
  {
    title: "Celebrity",
    artist: "아이유",
    tags: {
      mood: ["fun", "energetic"],
      difficulty: "medium",
      groupSize: ["solo", "duo"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "heating"]
    }
  },
  {
    title: "Bad Boy",
    artist: "레드벨벳",
    tags: {
      mood: ["fun", "calm"],
      difficulty: "medium",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["opening"]
    }
  },
  {
    title: "LOVE SCENARIO",
    artist: "iKON",
    tags: {
      mood: ["fun", "calm"],
      difficulty: "easy",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "mood_change"]
    }
  },
  {
    title: "After LIKE",
    artist: "아이브",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "medium",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "heating"]
    }
  },
  {
    title: "Dolphin",
    artist: "오마이걸",
    tags: {
      mood: ["fun", "calm"],
      difficulty: "easy",
      groupSize: ["duo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "heating"]
    }
  },

  // ===== 분위기 전환용 =====
  {
    title: "취중진담",
    artist: "김동률",
    tags: {
      mood: ["emotional", "calm"],
      difficulty: "medium",
      groupSize: ["solo"],
      timeSlot: ["night", "dawn"],
      situation: ["mood_change", "closing"]
    }
  },
  {
    title: "비와 당신",
    artist: "김정민",
    tags: {
      mood: ["emotional"],
      difficulty: "hard",
      groupSize: ["solo"],
      timeSlot: ["night", "dawn"],
      situation: ["mood_change"]
    }
  },
  {
    title: "사느라 사랑하느라",
    artist: "김현철",
    tags: {
      mood: ["calm"],
      difficulty: "medium",
      groupSize: ["solo", "duo"],
      timeSlot: ["evening", "night"],
      situation: ["mood_change"]
    }
  },
  {
    title: "아틀란티스 소녀",
    artist: "보아",
    tags: {
      mood: ["fun", "energetic"],
      difficulty: "medium",
      groupSize: ["solo", "duo"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "mood_change"]
    }
  },
  {
    title: "사건의 지평선",
    artist: "윤하",
    tags: {
      mood: ["emotional", "energetic"],
      difficulty: "hard",
      groupSize: ["solo", "group"],
      timeSlot: ["night", "dawn"],
      situation: ["mood_change", "closing"]
    }
  },
  {
    title: "너의 모든 순간",
    artist: "성시경",
    tags: {
      mood: ["calm", "emotional"],
      difficulty: "medium",
      groupSize: ["solo", "duo"],
      timeSlot: ["night", "dawn"],
      situation: ["mood_change", "closing"]
    }
  },

  // ===== 새벽감성 =====
  {
    title: "널 사랑하지 않아",
    artist: "어반 자카파",
    tags: {
      mood: ["emotional", "calm"],
      difficulty: "medium",
      groupSize: ["solo", "duo"],
      timeSlot: ["dawn"],
      situation: ["closing"]
    }
  },
  {
    title: "우리가 헤어진 진짜 이유",
    artist: "유승우",
    tags: {
      mood: ["calm", "emotional"],
      difficulty: "easy",
      groupSize: ["solo"],
      timeSlot: ["night", "dawn"],
      situation: ["closing", "mood_change"]
    }
  },
  {
    title: "서울의 달",
    artist: "김건모",
    tags: {
      mood: ["calm", "emotional"],
      difficulty: "medium",
      groupSize: ["solo", "group"],
      timeSlot: ["dawn"],
      situation: ["closing"]
    }
  },

  // ===== 커플용 =====
  {
    title: "썸",
    artist: "소유, 정기고",
    tags: {
      mood: ["fun", "calm"],
      difficulty: "easy",
      groupSize: ["duo"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "mood_change"]
    }
  },
  {
    title: "밤편지",
    artist: "아이유",
    tags: {
      mood: ["calm", "emotional"],
      difficulty: "medium",
      groupSize: ["solo", "duo"],
      timeSlot: ["night", "dawn"],
      situation: ["mood_change", "closing"]
    }
  },
  {
    title: "우주를 줄게",
    artist: "볼빨간사춘기",
    tags: {
      mood: ["fun", "calm"],
      difficulty: "easy",
      groupSize: ["solo", "duo"],
      timeSlot: ["evening", "night"],
      situation: ["opening"]
    }
  },
  {
    title: "All For You",
    artist: "서인국, 정은지",
    tags: {
      mood: ["fun", "calm"],
      difficulty: "easy",
      groupSize: ["duo"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "mood_change"]
    }
  },
  {
    title: "Dream",
    artist: "수지, 백현",
    tags: {
      mood: ["calm", "emotional"],
      difficulty: "easy",
      groupSize: ["duo"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "closing"]
    }
  },
  {
    title: "내 손을 잡아",
    artist: "아이유",
    tags: {
      mood: ["fun", "calm"],
      difficulty: "easy",
      groupSize: ["duo"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "mood_change"]
    }
  },
  {
    title: "어떻게 이별까지 사랑하겠어",
    artist: "악동뮤지션",
    tags: {
      mood: ["emotional", "calm"],
      difficulty: "medium",
      groupSize: ["duo"],
      timeSlot: ["night", "dawn"],
      situation: ["closing"]
    }
  },

  // ===== 친구모임용 =====
  {
    title: "거짓말",
    artist: "빅뱅",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "medium",
      groupSize: ["solo", "group"],
      timeSlot: ["evening", "night"],
      situation: ["opening", "heating"]
    }
  },
  {
    title: "Fantastic Baby",
    artist: "빅뱅",
    tags: {
      mood: ["energetic"],
      difficulty: "medium",
      groupSize: ["group"],
      timeSlot: ["night"],
      situation: ["heating"]
    }
  },
  {
    title: "아주 NICE",
    artist: "세븐틴",
    tags: {
      mood: ["energetic", "fun"],
      difficulty: "medium",
      groupSize: ["group"],
      timeSlot: ["evening", "night"],
      situation: ["heating"]
    }
  },
  {
    title: "눈, 코, 입",
    artist: "태양",
    tags: {
      mood: ["emotional"],
      difficulty: "medium",
      groupSize: ["solo"],
      timeSlot: ["night", "dawn"],
      situation: ["closing"]
    }
  },
  {
    title: "삐딱하게",
    artist: "GD",
    tags: {
      mood: ["fun", "energetic"],
      difficulty: "hard",
      groupSize: ["solo"],
      timeSlot: ["night"],
      situation: ["heating", "mood_change"]
    }
  },
  {
    title: "마지막 인사",
    artist: "빅뱅",
    tags: {
      mood: ["emotional"],
      difficulty: "medium",
      groupSize: ["solo", "group"],
      timeSlot: ["night", "dawn"],
      situation: ["closing"]
    }
  },
  {
    title: "소주 한 잔",
    artist: "임창정",
    tags: {
      mood: ["emotional", "fun"],
      difficulty: "easy",
      groupSize: ["solo", "group"],
      timeSlot: ["night", "dawn"],
      situation: ["heating", "closing"]
    }
  },
  {
    title: "한숨",
    artist: "이하이",
    tags: {
      mood: ["emotional", "calm"],
      difficulty: "medium",
      groupSize: ["solo"],
      timeSlot: ["night", "dawn"],
      situation: ["mood_change", "closing"]
    }
  },
  {
    title: "잔소리",
    artist: "아이유, 슬옹",
    tags: {
      mood: ["fun", "calm"],
      difficulty: "easy",
      groupSize: ["duo"],
      timeSlot: ["evening", "night"],
      situation: ["opening"]
    }
  }
];

// 태그 상수 정의
export const TAGS = {
  mood: {
    energetic: "신나는",
    calm: "잔잔한",
    fun: "재미있는",
    emotional: "감성적인"
  },
  difficulty: {
    easy: "쉬움",
    medium: "보통",
    hard: "어려움"
  },
  groupSize: {
    solo: "혼자",
    duo: "둘이서",
    group: "여럿이서"
  },
  timeSlot: {
    evening: "저녁",
    night: "밤",
    dawn: "새벽"
  },
  situation: {
    opening: "첫 곡",
    heating: "분위기 띄우기",
    closing: "마무리",
    mood_change: "분위기 전환"
  }
};

export const validateSongs = (songs) => {
  const tagSets = {
    mood: new Set(Object.keys(TAGS.mood)),
    difficulty: new Set(Object.keys(TAGS.difficulty)),
    groupSize: new Set(Object.keys(TAGS.groupSize)),
    timeSlot: new Set(Object.keys(TAGS.timeSlot)),
    situation: new Set(Object.keys(TAGS.situation))
  };

  const issues = [];
  songs.forEach((song, index) => {
    const label = `${song.title || "제목 없음"} - ${song.artist || "아티스트 없음"} (#${index + 1})`;

    if (!song.title || !song.artist) {
      issues.push(`${label}: title/artist 누락`);
    }

    if (!song.tags) {
      issues.push(`${label}: tags 누락`);
      return;
    }

    const { mood, difficulty, groupSize, timeSlot, situation } = song.tags;

    const ensureArrayTags = (key, values) => {
      if (!Array.isArray(values) || values.length === 0) {
        issues.push(`${label}: ${key} 태그 누락`);
        return;
      }
      values.forEach(value => {
        if (!tagSets[key].has(value)) {
          issues.push(`${label}: ${key} 태그 오류 (${value})`);
        }
      });
    };

    ensureArrayTags("mood", mood);
    ensureArrayTags("groupSize", groupSize);
    ensureArrayTags("timeSlot", timeSlot);
    ensureArrayTags("situation", situation);

    if (!tagSets.difficulty.has(difficulty)) {
      issues.push(`${label}: difficulty 태그 오류 (${difficulty || "없음"})`);
    }
  });

  return issues;
};