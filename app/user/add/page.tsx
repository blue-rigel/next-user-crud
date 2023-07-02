"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userCreateUpdateSchema } from "@/util/schema";
import { useCreateUserMutation } from "@/services/user";

export default function Add() {
  const [createUser, response] = useCreateUserMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userCreateUpdateSchema) });
  const onSubmit = async (data: any) => {
    await createUser(data);
    router.replace("/");
  };

  return (
    <div className="min-h-screen md:p-16 p-6">
      <div className="flex justify-between mb-14">
        <p className="text-3xl font-semibold">Add New User</p>
        <div>
          <Link href="/">
            <Button label="Go Back" className="mr-4" />
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="User Name"
          register={register}
          errors={errors}
          field="username"
          required
        />
        <Input
          label="First Name"
          register={register}
          errors={errors}
          field="first_name"
          required
        />
        <Input
          label="Last Name"
          register={register}
          errors={errors}
          field="last_name"
        />
        <Button label="Create User" type="submit" />
      </form>
    </div>
  );
}
