"use client";
//sanity에서 사용자 정보 읽어와야 함(팔로잉 정보..)

export default function FollowingBar() {
  return <div className="bg-neutral-50">FollowingBar</div>;
}

// 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 로 사용자 정보 얻어올 것
// (로그인을 한번 하면 서버로부터 응답 헤더에 토큰 정보를 받음, 이후 요청들에는 자동으로 함께 보내짐 -> 유저 명시 할 필요 없음)

// 2. 백엔드에서 현재 로그인된 사용자의 세션 정보 이용하여 sanity에서 followings 상세 정보 가져옴
// 3. 클라이언트 컴포넌트에서 정보를 읽어와 보여줌(image, user name)
