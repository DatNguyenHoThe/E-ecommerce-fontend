"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { env } from "@/libs/env.helper";
import axios from "axios";

const schema = yup
  .object({
    userName: yup.string().required("User Name is required"),
    fullName: yup.string().required("Full Name is required"),
    email: yup
      .string()
      .max(100)
      .required("Email is required")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email address is invalid"
      ),
    password: yup
        .string()
        .required("Password is required")
        .min(6,"Password must be at least 6 characters"),
    avatarUrl: yup.string().nullable()
  })
  .required();

interface IUserForm {
    userName: string;
    fullName: string;
    email: string;
    password: string;
    avatarUrl?: string;
}

export default function RegisterButton() {
  const [open, setOpen] = useState(false);
  //khai báo form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({
    resolver: yupResolver(schema) as unknown as Resolver<IUserForm>,
    mode: "onChange"
  });

  const createUser = async (
    values: IUserForm
  ): Promise<IUserForm | undefined> => {
    try {
      // Thực hiện gọi API để thêm địa chỉ
      const response = await axios.post(`${env.API_URL}/users`,
        values,
        {
            headers: {
                "Content-Type": "application/json",
            }
        },
      );
      if (response.status === 201) {
        alert("Bạn đã tạo tài khoản thành công!");
        setOpen(false);
        return response?.data?.data;
      } else {
        alert("Tạo tài khoản thất bại!");
      }
    } catch (error) {
      console.error("create new user failed", error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                Chưa có tài khoản?{" "}
                <span 
                    className="text-blue-500 cursor-pointer hover:underline" 
                    onClick={() => { 
                    // Chuyển hướng đến trang đăng ký
                    // Ví dụ: window.location.href = '/register';
                    }}
                >
                    Đăng ký ngay
                </span>
                </p>
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader className="flex justify-center">
            <DialogTitle className="flex justify-center pb-4 border-b border-gray-300 font-bold text-red-500">
              Đăng ký tài khoản
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(createUser)}
            className="space-y-4 flex flex-col"
          >
            {/* userName */}
            <div className="flex gap-x-5 items-center">
              <label
                htmlFor="userName"
                className="font-bold w-[130px] text-start"
              >
                User Name
              </label>
              <div className="flex flex-1 flex-col">
                <input
                  id="userName"
                  {...register("userName")}
                  className="input border border-gray-700 px-4 py-2"
                />
                {errors.userName && (
                  <span className="text-red-500 text-[12px]">{errors.userName.message}</span>
                )}
              </div>
            </div>
            {/* fullName */}
            <div className="flex gap-x-5 items-center">
              <label
                htmlFor="fullName"
                className="font-bold w-[130px] text-start"
              >
                Full Name
              </label>
              <div className="flex flex-1 flex-col">
                <input
                  id="fullName"
                  {...register("fullName")}
                  className="input border border-gray-700 px-4 py-2"
                />
                {errors.fullName && (
                  <span className="text-red-500 text-[12px]">{errors.fullName.message}</span>
                )}
              </div>
            </div>
            {/* email */}
            <div className="flex gap-x-5 items-center">
              <label
                htmlFor="email"
                className="font-bold w-[130px] text-start"
              >
                Email
              </label>
              <div className="flex flex-1 flex-col">
                <input
                  id="email"
                  {...register("email")}
                  className="input border border-gray-700 px-4 py-2"
                />
                {errors.email && (
                  <span className="text-red-500 text-[12px]">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
            {/* password */}
            <div className="flex gap-x-5 items-center">
              <label
                htmlFor="password"
                className="font-bold w-[130px] text-start"
              >
                Password
              </label>
              <div className="flex flex-1 flex-col">
                <input
                  id="password"
                  {...register("password")}
                  className="input border border-gray-700 px-4 py-2"
                />
                {errors.password && (
                  <span className="text-red-500 text-[12px]">{errors.password.message}</span>
                )}
              </div>
            </div>
            {/* avatarUrl */}
            <div className="flex gap-x-5 items-center">
              <label htmlFor="avatarUrl" className="font-bold w-[130px] text-start">
                Ảnh dại diện
              </label>
              <div className="flex flex-1 flex-col">
                <input
                  id="avatarUrl"
                  {...register("avatarUrl")}
                  className="input border border-gray-700 px-4 py-2"
                />
                {errors.avatarUrl && (
                  <span className="text-red-500 text-[12px]">{errors.avatarUrl.message}</span>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <Button
                type="submit"
                className="px-10 py-1 bg-black"
              >
                Đăng ký
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

