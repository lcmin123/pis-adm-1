import { useState } from "react";
import { router } from "../../routes/router";

export default function Header() {
  return (
    <header>
      <nav class="header">
        <div class="header_left">
          <i class="fa-regular fa-house"></i>
          <h1>경기인관리시스템</h1>
        </div>
        <div class="header__nav">
          <ul>
            <li>
              <button onClick={() => router.navigate({ to: "/" })}>홈</button>
            </li>
            <li>
              <a href="#">시스템관리</a>
            </li>
            <li>
              <a href="#">신청관리</a>
            </li>
            <li>
              <a href="#">등록관리</a>
            </li>
          </ul>
        </div>
        <div class="header_right">
          <div>화면 도움말</div>
          <div>| 화면 ID |</div>
          <div>체육정보시스템</div>
        </div>
      </nav>
    </header>
  );
}
