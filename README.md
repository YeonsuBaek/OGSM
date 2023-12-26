# OGSM

OGSM(Objective, Goal, Strategy, Measure) Modal이란 장기적인 측면에서 우리가 달성하고자 하는 것이 무엇이고, 그것을 어떻게 달성하고 있는가를 알게 해주는 툴이다.  

> **프로젝트명**: OGSM  
> **기획 및 제작**: yeonsu  
> **제작 기간**: 2023.11 - 2023.12 (v1.0)  
> **주요 기능**: 구글 로그인, OGSM 추가/수정/삭제  

## 👩🏻‍💻 Built with

- Next.js, TypeScript
- CSS, [MUI](https://mui.com)
- firebase

## 🚀 Demo

## ✨ Functions

### 구글 로그인

### OGSM 목록
- Goal, 디데이, 러닝데이 정보가 표시된다.
- Switch Toggle을 통해 Done State를 변경한다.
- 로그인 상태가 아니거나 OGSM 데이터가 없는 경우 문구로 대체한다.

### OGSM 추가
- Objective, Goal, Strategy, Measure, Start Date, End Date를 작성한다.
- 글자 수 또는 값 중복 제한과 같은 유효성 검사를 실시한다.
- 필수 값 여부에 따라 저장 버튼 활성화가 결정된다.

### OGSM 수정
- Objective, Goal, Strategy, Measure, Start Date, End Date, Done State를 수정한다.

### OGSM 삭제
- Modal 하단 삭제 버튼으로 OGSM을 삭제한다.

## 💻 Getting Started

### Requirements

For building and running the application you need:

[Node.js 18.16.0](https://nodejs.org/ca/blog/release/v18.16.0)  
[Npm 9.5.1](https://www.npmjs.com/package/npm/v/9.5.1)

### Installation

```
git clone https://github.com/YeonsuBaek/OGSM.git

npm install
npm run dev
```

## 

```
📦src
 ┣ 📂app
 ┃ ┣ 📂main
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂providers
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📜index.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📂blocks/modal
 ┃ ┃ ┗ 📜OgsmModal.tsx
 ┃ ┣ 📂features/main
 ┃ ┃ ┣ 📜OgsmItem.tsx
 ┃ ┗ ┗ 📜OgsmList.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useAuth.tsx
 ┃ ┣ 📜useDeleteOgsm.tsx
 ┃ ┣ 📜useGetOgsm.tsx
 ┃ ┣ 📜useLoginOgsm.tsx
 ┃ ┣ 📜useLogoutOgsm.tsx
 ┃ ┣ 📜useSaveOgsm.tsx
 ┃ ┗ 📜useUpdateOgsm.tsx
 ┣ 📂types
 ┗ ┗ 📜index.tsx
```
