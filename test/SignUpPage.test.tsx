import "@testing-library/jest-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/auth/contexts/AuthContext";
import SignUpPage from "../src/auth/page/SignUpPage";

const { mockSignUp, mockLogin } = vi.hoisted(() => ({
  mockSignUp: vi.fn(),
  mockLogin: vi.fn(),
}));

vi.mock("../src/auth/repository/AuthRepository", () => {
  return {
    AuthRepository: vi.fn().mockImplementation(function () {
      return {
        signUp: mockSignUp,
        login: mockLogin,
      };
    }),
  };
});

window.alert = vi.fn();

describe("SignUpPage 통합 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSignUp = () =>
    render(
      <BrowserRouter>
        <AuthProvider>
          <SignUpPage />
        </AuthProvider>
      </BrowserRouter>
    );

  test("비밀번호가 일치하지 않으면 에러 메시지를 표시하고 제출하지 않는다", async () => {
    renderSignUp();

    fireEvent.change(screen.getByLabelText("이메일"), {
      target: { value: "test@abc.com" },
    });

    fireEvent.change(screen.getByLabelText("이름"), {
      target: { value: "홍길동" },
    });

    fireEvent.change(screen.getByLabelText("닉네임"), {
      target: { value: "tester" },
    });

    fireEvent.change(screen.getByLabelText("전화번호"), {
      target: { value: "010-1234-5678" },
    });

    // 비밀번호 입력
    fireEvent.change(screen.getByLabelText("비밀번호"), {
      target: { value: "1234" },
    });
    fireEvent.change(screen.getByLabelText("비밀번호 확인"), {
      target: { value: "5678" },
    });

    fireEvent.click(screen.getByRole("button", { name: /회원가입 완료/i }));

    expect(
      screen.getByText(/비밀번호가 일치하지 않습니다/i)
    ).toBeInTheDocument();

    expect(mockSignUp).not.toHaveBeenCalled();
  });

  test("모든 정보가 올바르면 회원가입 API를 호출한다", async () => {
    renderSignUp();

    fireEvent.change(screen.getByLabelText("이메일"), {
      target: { value: "test@abc.com" },
    });

    fireEvent.change(screen.getByLabelText("이름"), {
      target: { value: "홍길동" },
    });

    fireEvent.change(screen.getByLabelText("닉네임"), {
      target: { value: "tester" },
    });

    fireEvent.change(screen.getByLabelText("전화번호"), {
      target: { value: "010-1234-5678" },
    });

    fireEvent.change(screen.getByLabelText("비밀번호"), {
      target: { value: "1234" },
    });
    fireEvent.change(screen.getByLabelText("비밀번호 확인"), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /회원가입 완료/i }));

    await waitFor(
      () => {
        expect(mockSignUp).toHaveBeenCalled();
      },
      { timeout: 2000 }
    );
  });
});
