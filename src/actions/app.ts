"use server"

import supabase from "@/services/supabase"
import bcrypt from "bcrypt"
import db from "@/services/prisma"

import { Hospital, Prisma } from "@prisma/client"
import { cookies } from "next/headers"
import { actionResponse } from "@/lib/api"
import { ADMIN_COOKIE_HOSPITAL_ID } from "@/app/dashboard/(helpers)/_utils/constants"

export async function uploadFile(file: File, bucketName: string, fileName: string) {
  const { error } = await supabase.storage.from("main").upload(fileName, file, {
    cacheControl: "3600",
    upsert: false
  })
  if (error) throw new Error(error.message)
  const publicUrl = supabase.storage.from("main").getPublicUrl(fileName).data.publicUrl
  return publicUrl
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
