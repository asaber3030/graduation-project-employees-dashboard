"use server"

import supabase from "@/services/supabase"
import bcrypt from "bcrypt"
import db from "@/services/prisma"

import { v2 as cloudinary } from "cloudinary"

import { Hospital, Prisma } from "@prisma/client"
import { cookies } from "next/headers"
import { actionResponse } from "@/lib/api"
import { ADMIN_COOKIE_HOSPITAL_ID } from "@/app/dashboard/(helpers)/_utils/constants"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!
})

export async function uploadToCloudinary(file: File, folder: string = "all_files"): Promise<string> {
  const buffer = await file.arrayBuffer()
  const base64 = Buffer.from(buffer).toString("base64")
  const dataUrl = `data:${file.type};base64,${base64}`

  try {
    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: folder ?? "uploads"
    })

    return result.secure_url
  } catch (error) {
    console.error("Cloudinary upload failed:", error)
    throw new Error("Upload to Cloudinary failed")
  }
}

export async function getHospitals() {
  const hospitals = await db.hospital.findMany({ orderBy: { id: "desc" } })
  return hospitals
}

export async function getHospital(record: Prisma.HospitalWhereUniqueInput) {
  const hospital = await db.hospital.findUnique({ where: record })
  return hospital
}

export async function getCurrentHospital(id: number): Promise<Hospital> {
  const hospital = await db.hospital.findUnique({ where: { id } })
  if (!hospital) return (await db.hospital.findUnique({ where: { id: 1 } })) as Hospital
  return hospital
}

export async function currentHospital(): Promise<Hospital> {
  const hospitalId = Number(cookies().get(ADMIN_COOKIE_HOSPITAL_ID)?.value ?? 1) ?? 1
  const currentHospital = await getCurrentHospital(hospitalId)
  return currentHospital
}

export async function verifyPassword(password: string) {
  const hospital = await currentHospital()

  const isPasswordVerified = await bcrypt.compare(password, hospital.password)
  if (!isPasswordVerified) return actionResponse(404, "Password is incorrect")

  return actionResponse(200, "Password is correct")
}
