"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { useGetSingleUserQuery, useUpdateUserMutation } from "@/services/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { userCreateUpdateSchema } from "@/util/schema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Edit({ params }: { params: { id: string } }) {
  const { data, error, isLoading } = useGetSingleUserQuery(params.id);
  const [updateUser, response] = useUpdateUserMutation();
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userCreateUpdateSchema) });

  const onSubmit = async (data: any) => {
    await updateUser({id: parseInt(params.id), ...data})
    router.replace("/")
  };

  useEffect(() => {
    if(data) {
        setValue("first_name", data.data["first_name"])
        setValue("last_name", data.data["last_name"])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  if(isLoading) {
    return (<p>Loading...</p>)
  }

  if(error) {
    router.replace("/")
  }

  return (
    <div className="min-h-screen md:p-16 p-6">
      <div className="flex justify-between mb-14">
        <p className="text-3xl font-semibold">Edit User</p>
        <div>
          <Link href="/">
            <Button label="Go Back" className="mr-4" />
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button label="Update User" type="submit" />
      </form>
    </div>
  );
}
