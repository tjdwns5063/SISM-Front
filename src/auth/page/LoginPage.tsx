import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-primary">
            sasm 커뮤니티
          </CardTitle>
          <CardDescription>
            서비스 이용을 위해 로그인이 필요합니다.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="id">아이디</Label>
            <Input id="id" type="text" placeholder="아이디를 입력하세요" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full text-lg h-12">로그인</Button>

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                계정이 없으신가요?
              </span>
            </div>
          </div>

          <Button variant="outline" asChild className="w-full">
            <Link
              to="/sign-up"
              className="text-primary font-medium hover:underline"
            >
              회원가입
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
