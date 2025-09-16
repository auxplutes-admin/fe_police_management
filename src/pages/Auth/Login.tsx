import { LoginForm } from "../../components/Form/LoginForm"

export default function Login() {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center gap-4 w-full flex-1">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
