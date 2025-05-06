import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface SignupInput {
  userName: string;
  language?: string;
}

interface SignupResponse {
  token: string;
  language: string;
}

const signup = async ({ userName, language }: SignupInput): Promise<SignupResponse> => {
  const response = await axios.post("/user", { userName, language });
  return response.data;
};

export function useSignupMutation() {
  return useMutation({ mutationFn: signup });
}
