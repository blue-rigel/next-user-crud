"use client"
import Button from "@/components/button";
import Table from "@/components/table";
import { useDeleteUserMutation, useGetAllUsersQuery } from "@/services/user";
import { TableColumn, TableData } from "@/util/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {

  const columns:TableColumn[] = [
    {
      label: "Username",
      key: "username"
    },
    {
      label: "Firstname",
      key: "first_name"
    },
    {
      label: "Lastname",
      key: "last_name"
    },
  ]

  const { data, error, isLoading } = useGetAllUsersQuery();
  const router = useRouter();
  const [deleteUser, response] = useDeleteUserMutation()

  const deleteUserById = async (id: number) => {
    await deleteUser(id)
  }

  const editUserRoute = (id: number) => {
    router.push(`/user/${id}`)
  }

  return (
    <main className="min-h-screen md:p-16 p-6">
      <div className="flex justify-between mb-14">
        <p className="text-3xl font-semibold">User Management</p>
        <Link href="/user/add"><Button label="Add New User"/></Link>
      </div>
      {
        error && <p>Failed to load user</p>
      }
      {
        isLoading && !error ?
        <p>Loading....</p> : 
        <Table columns={columns} data={data?.data as unknown[] as TableData[]} actions={true} del={deleteUserById} edit={editUserRoute} /> 
      }
    </main>
  )
}
