# OGSM

OGSM(Objective, Goal, Strategy, Measure) Modal이란 장기적인 측면에서 우리가 달성하고자 하는 것이 무엇이고, 그것을 어떻게 달성하고 있는가를 알게 해주는 툴이다.

> **프로젝트명**: OGSM  
> **기획 및 제작**: yeonsu  
> **제작 기간**: 2023.11 - 2023.12 (v1.0)  
> **주요 기능**: 구글 로그인, OGSM 추가/수정/삭제

## 👩🏻‍💻 Built with

- Frontend: Next.js, TypeScript, CSS, [MUI](https://mui.com)
- Backend: Firebase

## 🚀 Demo

https://ogsm.vercel.app/

## ✨ Functions

### 로그인 및 데이터 관리

- Firebase Authentication를 활용한 구글 로그인 및 관리
- Cloud FireStore를 활용한 사용자별 OGSM 데이터 관리

### OGSM 목록

- Goal, 디데이, 러닝데이 정보가 표시된다.
- Switch Toggle을 통해 Done State를 변경한다.
- 로그인 상태가 아니거나 OGSM 데이터가 없는 경우 문구로 대체한다.

| ![](https://velog.velcdn.com/images/yeonsubaek/post/29517019-4451-40a9-9d8a-210cf59a5e70/image.png) | ![](https://velog.velcdn.com/images/yeonsubaek/post/682d5d5a-7d14-4bff-a22d-0140160981cd/image.png) | ![](https://velog.velcdn.com/images/yeonsubaek/post/6f9576e7-9a7f-4526-87b2-336a29b5d079/image.png) | ![](https://velog.velcdn.com/images/yeonsubaek/post/2ee92d38-c1a4-48b0-ba5b-7a3460b8d1a1/image.png) |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 로그인 X                                                                                            | 로그인 O 데이터 X                                                                                   | 로그인 O 데이터 O                                                                                   | Done State 변경                                                                                     |

### OGSM 추가

- Objective, Goal, Strategy, Measure, Start Date, End Date를 작성한다.
- 글자 수 또는 값 중복 제한과 같은 유효성 검사를 실시한다.
- 필수 값 여부에 따라 저장 버튼 활성화가 결정된다.

| ![](https://velog.velcdn.com/images/yeonsubaek/post/56b6cf2a-5f56-4b36-b152-3c726091142d/image.png) | ![](https://velog.velcdn.com/images/yeonsubaek/post/c2ec3441-2238-408a-a181-7a8942ac7447/image.png) | ![](https://velog.velcdn.com/images/yeonsubaek/post/283935f0-073c-4036-b304-6f35c49f9696/image.png) | ![](https://velog.velcdn.com/images/yeonsubaek/post/0422ccd8-b46a-4c24-a748-22306c5bba81/image.png) |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 입력 값이 빈 경우                                                                                   | 유효성 검사 실패                                                                                    | 저장 성공                                                                                           | 저장 실패                                                                                           |

### OGSM 수정

- Objective, Goal, Strategy, Measure, Start Date, End Date, Done State를 수정한다.
- 수정 사항이 없는 경우 저장 버튼을 비활성화 한다.

| ![](https://velog.velcdn.com/images/yeonsubaek/post/0e212ba1-fe7a-4f43-ac4f-79b7b39690a5/image.png) | ![](https://velog.velcdn.com/images/yeonsubaek/post/f5c38214-9893-4daa-ba00-818cf97300d3/image.png) |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 수정 성공                                                                                           | 수정 실패                                                                                           |

### OGSM 삭제

- Modal 하단 삭제 버튼으로 OGSM을 삭제한다.

| ![](https://velog.velcdn.com/images/yeonsubaek/post/dd59f25b-650c-4083-90e2-ff0bb6272962/image.png) | ![](https://velog.velcdn.com/images/yeonsubaek/post/12d022f1-248e-4eae-812c-e451e1e5f87f/image.png) |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 삭제 성공                                                                                           | 삭제 실패                                                                                           |

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

## 🗂 Architecture

```
📦 src
 ┣ 📂 app
 ┃ ┣ 📂 main
 ┃ ┃ ┗ 📄 page.tsx
 ┃ ┣ 📂 providers
 ┃ ┃ ┗ 📄 index.tsx
 ┃ ┣ 📄 index.css
 ┃ ┣ 📄 layout.tsx
 ┃ ┗ 📄 page.tsx
 ┣ 📂 components
 ┃ ┣ 📂 blocks
 ┃ ┃ ┣ 📂 button
 ┃ ┃ ┃ ┗ 📄 OgsmAddButton.tsx
 ┃ ┃ ┣ 📂 form
 ┃ ┃ ┃ ┣ 📄 DatePickerForm.tsx
 ┃ ┃ ┃ ┣ 📄 SwitchForm.tsx
 ┃ ┃ ┃ ┣ 📄 SwitchInListForm.tsx
 ┃ ┃ ┃ ┗ 📄 TextFieldForm.tsx
 ┃ ┃ ┣ 📂 modal
 ┃ ┃ ┃ ┗ 📄 OgsmModal.tsx
 ┃ ┣ 📂 features/main
 ┃ ┃ ┣ 📄 Content.tsx
 ┃ ┃ ┣ 📄 Header.tsx
 ┃ ┃ ┣ 📄 OgsmItem.tsx
 ┃ ┗ ┗ 📄 OgsmList.tsx
 ┣ 📂 hooks
 ┃ ┣ 📄 useAuth.tsx
 ┃ ┣ 📄 useGetOgsm.tsx
 ┃ ┣ 📄 useLoginOgsm.tsx
 ┃ ┣ 📄 useLogoutOgsm.tsx
 ┃ ┣ 📄 useMutationOgsm.tsx
 ┃ ┗ 📄 useSaveOgsm.tsx
 ┣ 📂 types
 ┗ ┗ 📄 index.tsx
```
